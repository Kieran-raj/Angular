import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { BarData } from '../shared/models/bar-data';
import { DailyTransaction } from '../shared/models/daily-transaction';
import { LineData } from '../shared/models/line-data';
import { MonthlyTransaction } from '../shared/models/monthly-transaction';
import {
  loadCategoricalAmounts,
  loadDailyTransactions,
  loadHistoricalTransactions,
  loadMonthlyTransactions,
} from './data-state/actions/transactions.action';
import {
  selectCategoricalAmounts,
  selectChosenExpense,
  selectDailyTransactions,
  selectMonthlyTransactions,
  selectMovingAverageAmounts,
} from './data-state/selectors/transactions.selectors';
import { TransactionState } from './data-state/states/transactions.state';
import { TransactionsService } from './api-services/transaction.service';
import { ChartHelper } from '../shared/helper-functions/chart-functions';
import { CategoricalAmounts } from '../shared/models/categorical-amounts';
import { PieData } from '../shared/models/pie-data';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateState } from './data-state/states/update.state';
import { addNewCategory } from './data-state/actions/updates.action';
import { MovingAverageAmounts } from '../shared/models/moving-average-amounts';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, AfterViewInit {
  @ViewChild(DateFilterComponent, { static: true })
  public dateFilter: DateFilterComponent;

  /**
   * Graph Properties
   */
  public pageTitle: string = 'Expenses';
  public allData: LineData[];
  public lineData: LineData[];
  public pieData: PieData[];
  public movingAverageData: any = [];
  public barData: BarData[] = [];
  public years: number[] = [];
  public xAxisTicks: string[] = [];
  public isLineDataLoading: boolean = true;

  /**
   * Icons
   */
  public faXmark: IconDefinition = faXmark;

  /**
   * What is the chosen granularity for the chart.
   * @type {string}
   */
  public chartMode = 'Daily';

  /**
   * Current drop down value.
   * @type {BehaviorSubject<string>}
   */
  public dropDownCurrentValue = new BehaviorSubject(this.chartMode);

  /**
   * Whether to show date selection.
   * @type {boolean}
   */
  public showDateSelection = true;

  /**
   * Daily amounts.
   * @type {Observable<DailyTransaction[] | undefined>}
   */
  public dailyAmounts$: Observable<DailyTransaction[] | undefined>;

  /**
   * Monthly amounts.
   * @type {Observable<MonthlyTransaction[] | undefined>}
   */
  public monthlyAmounts$: Observable<MonthlyTransaction[] | undefined>;

  /**
   * Moving average amounts.
   * @type {Observable<MovingAverageAmounts[] | undefined>}
   */
  public movingAverageAmounts$: Observable<MovingAverageAmounts[] | undefined> =
    this.transactionStore.select(selectMovingAverageAmounts);

  /**
   * Categorical amounts.
   * @type {Observable<CategoricalAmounts[] | undefined>}
   */
  public categoricalAmounts$: Observable<CategoricalAmounts[] | undefined>;

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
   * Modal instance.
   * @type {NgbModalRef}
   */
  public modal: NgbModalRef;

  sucessfulUpdate: boolean;

  updateMessage = 'Sucessfully added new cateogry';

  constructor(
    private transactionService: TransactionsService,
    private transactionStore: Store<TransactionState>,
    private updatesStore: Store<UpdateState>,
    private chartHelper: ChartHelper,
    private modalService: NgbModal
  ) {
    this.transactionStore.dispatch(loadDailyTransactions());

    this.transactionStore.dispatch(loadMonthlyTransactions());

    this.transactionStore.dispatch(loadHistoricalTransactions());

    this.transactionStore.dispatch(loadCategoricalAmounts());

    this.dailyAmounts$ = this.transactionStore.select(selectDailyTransactions);
  }

  ngOnInit(): void {
    this.monthlyAmounts$ = this.transactionStore.select(
      selectMonthlyTransactions
    );
    this.categoricalAmounts$ = this.transactionStore.select(
      selectCategoricalAmounts
    );

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
    });

    this.dailyAmounts$.subscribe((results: DailyTransaction[] | undefined) => {
      const mappedDailyAmountsToNgxCharts = results?.map(
        (dailyAmount: DailyTransaction) => {
          return { value: dailyAmount.amount, name: dailyAmount.date };
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
        5,
        mappedDailyAmountsToNgxCharts
      );
    });

    this.years = [2021];
    // this.transactionService.getYears().subscribe((results) => {
    //   this.years = results.data.years.sort();
    // });
  }

  dropDownChange(value: string): void {
    this.dropDownCurrentValue.next(value);
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.dropDownCurrentValue.subscribe((newValue) => {
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

    this.movingAverageAmounts$.subscribe(
      (results: MovingAverageAmounts[] | undefined) => {
        const mappedMovingAverageAmounts = results?.map(
          (movingAverage: MovingAverageAmounts) => {
            return {
              value: movingAverage.moving_average,
              name: movingAverage.date,
            };
          }
        );

        this.lineData.push({
          name: 'MovingAverage',
          series: mappedMovingAverageAmounts,
        });

        this.lineData = [...this.lineData];
      }
    );
  }

  resetGraph() {
    this.dropDownCurrentValue.next('Daily');
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

  openModal(content: any, id: string) {
    this.modalTitle = id.toLowerCase().includes('transaction')
      ? 'New Transaction'
      : 'New Category';
    this.modal = this.modalService.open(content);
  }

  private changeChart(value: string): void {
    if (value === 'Monthly') {
      this.subscriptions.push(
        this.monthlyAmounts$.subscribe(
          (results: MonthlyTransaction[] | undefined) => {
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
