import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, Observable, Subscription } from 'rxjs';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { BarData } from '../shared/models/bar-data';
import { LineData } from '../shared/models/line-data';
import { MonthlyExpense } from '../shared/models/monthly-expense';
import {
  loadCategoricalAmounts,
  loadDailyExpenses,
  loadAllExpenses,
  loadMonthlyExpense,
} from './data-state/actions/transactions.action';
import {
  selectCategoricalAmounts,
  selectChosenExpense,
  selectDailyTransactions,
  selectMonthlyTransactions,
  selectMovingAverageAmounts,
} from './data-state/selectors/transactions.selectors';
import { selectModalAction } from './data-state/selectors/updates.selectors';
import { TransactionState } from './data-state/states/transactions.state';
import { ChartHelper } from '../shared/helper-functions/chart-functions';
import { CategoricalAmounts } from '../shared/models/categorical-amounts';
import { PieData } from '../shared/models/pie-data';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsRotate,
  faChartLine,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MovingAverageAmounts } from '../shared/models/moving-average-amounts';
import { DailyAmount } from '../shared/models/daily-expense';
import { AuthService } from '../shared/auth/auth.service';
import { UpdateState } from './data-state/states/update.state';
import { addModalAction } from './data-state/actions/updates.action';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  @ViewChild(DateFilterComponent, { static: true })
  public dateFilter: DateFilterComponent;

  /**
   * Graph Properties
   */
  public pageTitle = 'Expenses';
  public allData: LineData[];
  public lineData: LineData[];
  public pieData: PieData[];
  public movingAverageData: any = [];
  public barData: BarData[] = [];
  public years = [2021, 2022, 2023];
  public xAxisTicks: string[] = [];
  public isLineDataLoading = true;

  /**
   * Icons
   */
  public faXmark: IconDefinition = faXmark;
  public faPlus: IconDefinition = faPlus;
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
   * Monthly amounts.
   * @type {Observable<MonthlyTransaction[] | undefined>}
   */
  public monthlyAmounts$ = this.transactionStore.select(
    selectMonthlyTransactions
  );

  /**
   * Moving average amounts.
   * @type {Observable<MovingAverageAmounts[] | undefined>}
   */
  public movingAverageAmounts$: Observable<
    MovingAverageAmounts[] | undefined | null
  > = this.transactionStore.select(selectMovingAverageAmounts);

  /**
   * Categorical amounts.
   * @type {Observable<CategoricalAmounts[] | undefined | null>}
   */
  public categoricalAmounts$ = this.transactionStore.select(
    selectCategoricalAmounts
  );

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
   * Is logged in
   */
  isLoggedIn$ = this.authService.isloggedIn;

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
   * Successful update
   * @type {boolean}
   */
  sucessfulUpdate: boolean;

  /**
   * Update message
   * @type {string}
   */
  updateMessage = 'Sucessfully added new cateogry';

  @ViewChild('editDeleteModal', { static: true })
  editDeleteModal: ElementRef;

  @ViewChild('modal', { static: true })
  modal: ElementRef;

  constructor(
    private transactionStore: Store<TransactionState>,
    private updateStore: Store<UpdateState>,
    private authService: AuthService,
    private chartHelper: ChartHelper,
    private modalService: NgbModal
  ) {
    this.transactionStore.dispatch(loadDailyExpenses());

    this.transactionStore.dispatch(loadMonthlyExpense());

    this.transactionStore.dispatch(loadAllExpenses());

    this.transactionStore.dispatch(loadCategoricalAmounts());
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
            pctOfTotal: category.percentage,
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
                name: dailyAmount.date.split('T')[0],
              };
            }
          );

          this.lineData = [
            {
              name: 'Transactions',
              series: mappedDailyAmountsToNgxCharts,
            },
          ];

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

    this.years = [2021, 2022, 2023];
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
      this.transactionStore
        .select(selectChosenExpense)
        .subscribe((expenses) => {
          if (expenses) {
            this.activeEntries = [
              {
                name: 'Transactions',
                series: [expenses],
              },
            ];
          }
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

    // TODO: Dont know if this will be done!! keeping just incase.
    // this.movingAverageAmounts$.subscribe(
    //   (results: MovingAverageAmounts[] | undefined | null) => {
    //     const mappedMovingAverageAmounts = results?.map(
    //       (movingAverage: MovingAverageAmounts) => {
    //         return {
    //           value: movingAverage.Amount,
    //           name: movingAverage.Date.split('T')[0],
    //         };
    //       }
    //     );

    //     this.lineData.push({
    //       name: 'MovingAverage',
    //       series: mappedMovingAverageAmounts,
    //     });

    //     this.lineData = [...this.lineData];
    //   }
    // );
  }

  resetGraph() {
    this.currentChartPeriod.next('Default');
    this.reloadGraphData();
  }

  toggleMovingAverage(event: boolean) {
    if (!event) {
      this.reloadGraphData();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setModalAction(action: string | null) {
    this.updateStore.dispatch(addModalAction({ action: action }));
  }

  private openModal(content: any) {
    this.modalInstance = this.modalService.open(content);
  }

  private changeChart(value: string): void {
    if (value === '1m') {
      this.subscriptions.push(
        this.monthlyAmounts$.subscribe(
          (results: MonthlyExpense[] | undefined | null) => {
            this.barData = this.chartHelper.formatMonthlyData(
              this.years,
              results
            );
          }
        )
      );
    }
  }

  private reloadGraphData() {
    const newLineData = this.lineData.filter(
      (data) => data.name === 'Transactions'
    );
    this.lineData = newLineData;
  }
}
