import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { LineData } from '../shared/models/line-data';
import {
  loadCategoricalAmounts,
  loadDailyExpenses,
  loadMonthlyInsAndOuts,
  loadExpenses
} from '../shared/data-state/actions/transactions.action';
import {
  selectCategoricalAmounts,
  selectDailyTransactions
} from '../shared/data-state/selectors/transactions.selectors';
import { selectModalAction } from '../shared/data-state/selectors/updates.selectors';
import { TransactionState } from '../shared/data-state/states/transactions.state';
import { ChartHelper } from '../shared/helper-functions/chart-functions';
import { PieData } from '../shared/models/pie-data';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsRotate,
  faChartLine,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DailyAmount } from '../shared/models/daily-expense';
import { UpdateState } from '../shared/data-state/states/update.state';
import { selectUserInfo } from '../shared/data-state/selectors/user.selectors';
import { UserState } from '../shared/data-state/states/user.state';
import { User } from '../shared/models/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CreateModalComponent } from './upcoming-grid/create-modal/create-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  @ViewChild(DateFilterComponent, { static: true })
  public dateFilter: DateFilterComponent;

  /**
   * Graph Properties
   */
  public pageTitle = 'Expenses';
  public allData: LineData[];
  public dailyData: LineData[];
  public pieData: PieData[];
  public xAxisTicks: string[] = [];
  public isLineDataLoading = true;

  /**
   * Icons
   */
  public faXmark: IconDefinition = faXmark;
  public faArrows: IconDefinition = faArrowsRotate;
  public faChartLine: IconDefinition = faChartLine;

  /**
   * What is the chosen granularity for the chart.
   * @type {string}
   */
  public chartMode = 'Default';

  /**
   * Current chart period.
   * @type {BehaviorSubject<string>}
   */
  public currentChartPeriod = new BehaviorSubject(this.chartMode);

  /**
   * Daily amounts.
   * @type {Observable<DailyExpense[] | undefined>}
   */
  public dailyAmounts$ = this.transactionStore.select(selectDailyTransactions);

  /**
   * Categorical amounts.
   * @type {Observable<CategoricalAmounts[] | undefined | null>}
   */
  public categoricalAmounts$ = this.transactionStore.select(
    selectCategoricalAmounts
  );

  /**
   * Chart data
   * @type {BehaviorSubject<LineData[] | null>}
   */
  public chartData$ = new BehaviorSubject<LineData[] | null>(null);

  /**
   * Active (selected) expense.
   */
  public activeEntries: any;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  /**
   * Modal title
   * @type {string}
   */
  public modalTitle: string;

  /**
   * Modal display rules
   * @type {[key: string]: any}
   */
  modalDisplayRules: any;

  /**
   * Modal instance.
   * @type {NgbModalRef}
   */
  public modalInstance: NgbModalRef;

  /**
   * Modal action.
   * @type {string}
   */
  public modalAction: string;

  /**
   * User observable
   * @type {Observable<User | null>}
   */
  public user$ = this.userStore.select(selectUserInfo);

  private dialogComponents: { [key: string]: any } = {
    CreateUserOptionComponent: CreateModalComponent
  };

  /**
   * Dialog instance
   * @type {MatDialogRef<any, any>}
   */
  private dialogInstance: MatDialogRef<any, any>;

  /**
   * Successful update
   * @type {boolean}
   */
  successfulUpdate: boolean;

  @ViewChild('editDeleteModal', { static: true })
  editDeleteModal: ElementRef;

  @ViewChild('modal', { static: true })
  modal: ElementRef;

  constructor(
    private transactionStore: Store<TransactionState>,
    private updateStore: Store<UpdateState>,
    private userStore: Store<UserState>,
    private chartHelper: ChartHelper,
    private modalService: NgbModal,
    private dialogService: MatDialog
  ) {
    this.transactionStore.dispatch(loadDailyExpenses());

    this.subscriptions.push(
      this.user$.subscribe((user: User | null) => {
        this.transactionStore.dispatch(
          loadExpenses({
            user: user
          })
        );
      })
    );

    this.transactionStore.dispatch(loadCategoricalAmounts());

    this.transactionStore.dispatch(loadMonthlyInsAndOuts());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoricalAmounts$.subscribe((data) => {
        let formatedPieData: any[] = [];
        data?.forEach((category) => {
          formatedPieData.push({
            name:
              category.category[0].toUpperCase() +
              category.category.substring(1).toLowerCase(),
            value: category.amount,
            pctOfTotal: category.percentage
          });
        });
        this.pieData = formatedPieData;
      })
    );

    this.subscriptions.push(
      this.dailyAmounts$.subscribe(
        (results: DailyAmount[] | undefined | null) => {
          const mappedDailyAmountsToNgxCharts = results?.map(
            (dailyAmount: DailyAmount) => {
              return {
                value: dailyAmount.amount,
                name: dailyAmount.date.split('T')[0]
              };
            }
          );

          const lineData = [
            {
              name: 'Transactions',
              series: mappedDailyAmountsToNgxCharts
            }
          ];

          this.dailyData = lineData;

          this.chartData$.next(lineData);

          if (mappedDailyAmountsToNgxCharts) {
            this.isLineDataLoading =
              mappedDailyAmountsToNgxCharts.length > 0 ? false : true;
          }

          this.xAxisTicks = this.chartHelper.generateLineXTicks(
            12,
            mappedDailyAmountsToNgxCharts
          );
        }
      )
    );
  }

  chartPeriodChange(value: string): void {
    this.currentChartPeriod.next(value);
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.currentChartPeriod.subscribe((newValue) => {
        if (this.chartMode !== newValue) {
          this.changeChart(newValue);
        }
        this.chartMode = newValue;
      })
    );

    this.subscriptions.push(
      this.updateStore.select(selectModalAction).subscribe((modalAction) => {
        if (modalAction) {
          this.modalAction = modalAction;
          this.openModal(this.modal);
        }
      })
    );
  }

  resetGraph() {
    this.currentChartPeriod.next('Default');
    this.reloadGraphData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public openDialog(componentName: string) {
    if (this.dialogComponents[componentName] == null) {
      console.log("Component doesn't exisit");
    }

    this.dialogInstance = this.dialogService.open(
      this.dialogComponents[componentName]
    );
  }

  private openModal(content: any) {
    this.modalInstance = this.modalService.open(content);
  }

  private changeChart(value: string): void {
    let data = null;
    let tickInterval = 0;

    switch (value) {
      case '1m': {
        data = this.dailyData[0].series?.slice(
          Math.max(this.dailyData[0].series.length - 30, 0)
        );
        tickInterval = 3;
        break;
      }
      case '6m': {
        data = this.dailyData[0].series?.slice(
          Math.max(this.dailyData[0].series.length - 180, 0)
        );
        tickInterval = 12;
        break;
      }
      case '1m': {
        data = this.dailyData[0].series?.slice(
          Math.max(this.dailyData[0].series.length - 365, 0)
        );
        tickInterval = 12;
        break;
      }
      default: {
        data = this.dailyData[0].series;
        tickInterval = 12;
        break;
      }
    }

    const newData = [
      {
        name: 'Transactions',
        series: data
      }
    ];

    this.chartData$.next(newData);

    this.xAxisTicks = this.chartHelper.generateLineXTicks(tickInterval, data);
  }

  private reloadGraphData() {
    const newLineData = this.dailyData.filter(
      (data) => data.name === 'Transactions'
    );
    this.dailyData = newLineData;
  }
}
