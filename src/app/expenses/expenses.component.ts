// TODO: NEED TO ADD TYPES TO ALL MISSING TYPES

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { BarData } from '../shared/models/bar-data';
import { DailyTransaction } from '../shared/models/daily-transaction';
import { LineData } from '../shared/models/line-data';
import { MonthlyTransaction } from '../shared/models/monthly-transaction';
import {
  loadDailyTransactions,
  loadHistoricalTransactions,
  loadMonthlyTransactions,
} from './data-state/actions/transactions.action';
import {
  selectChosenExpense,
  selectDailyTransactions,
  selectMonthlyTransactions,
} from './data-state/selectors/transactions.selectors';
import { TransactionState } from './data-state/states/transactions.state';
import { TransactionsService } from './api-services/transaction.service';
import { ChartHelper } from '../shared/helper-functions/chart-functions';

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
  public movingAverageData: any = [];
  public barData: BarData[] = [];
  public years: number[] = [];
  public xAxisTicks: string[] = [];

  public isLoading: boolean;

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
   * Active (selected) expense.
   */
  public activeEntries: any;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  constructor(
    private transactionService: TransactionsService,
    private transactionStore: Store<TransactionState>,
    private chartHelper: ChartHelper
  ) {
    this.transactionStore.dispatch(loadDailyTransactions());

    this.transactionStore.dispatch(loadMonthlyTransactions());

    this.transactionStore.dispatch(loadHistoricalTransactions());
  }

  ngOnInit(): void {
    this.dailyAmounts$ = this.transactionStore.select(selectDailyTransactions);
    this.monthlyAmounts$ = this.transactionStore.select(
      selectMonthlyTransactions
    );

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
  }

  changeChart(value: string): void {
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

  resetGraph() {
    this.dropDownCurrentValue.next('Daily');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
