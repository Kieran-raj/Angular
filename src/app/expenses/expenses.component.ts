// TODO: NEED TO ADD TYPES TO ALL MISSING TYPES
// TODO: Need to add a loading wheel
// TODO: Need to add a no data found
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DateFilterComponent } from '../components/date-filter/date-filter.component';
import { BarData } from '../shared/models/bar-data';
import { DailyTransaction } from '../shared/models/daily-transaction';
import { LineData } from '../shared/models/line-data';
import { LineDataSeries } from '../shared/models/line-data-series';
import { MonthlyTransaction } from '../shared/models/monthly-transaction';
import {
  loadDailyTransactions,
  loadMonthlyTransactions,
} from './data-state/actions/transactions.action';
import {
  selectDailyTransactions,
  selectMonthlyTransactions,
} from './data-state/selectors/transactions.selectors';
import { Transactions } from 'src/app/shared/models/transactions';
import { TransactionState } from './data-state/states/transactions.state';
import { TransactionsService } from './api-services/transaction.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  @ViewChild(DateFilterComponent, { static: true })
  public dateFilter: DateFilterComponent;

  /**
   * Graph Properties
   */
  public pageTitle: string = 'Expenses';
  public allData: LineData[];
  public lineData: LineData[];
  public mappedToNgxChartsLineData: any;
  public movingAverageData: any = [];
  public barData: BarData[] = [];
  public years: number[] = [];
  public isDailyData: boolean = true;
  public isWeeklyData: boolean = false;
  public isMonthlyData: boolean = false;
  public view: number[] = [1150, 350];
  public legendPosition: string = 'below';
  public xAxisLabel: string = 'Date';
  public yAxisLabel: string = 'Amount (£)';
  public xAxisTicks: string[] = [];

  public isLoading: boolean;

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
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  constructor(
    private transactionService: TransactionsService,
    private transactionStore: Store<TransactionState>
  ) {
    this.transactionStore.dispatch(
      loadDailyTransactions({
        transactions: {
          dailyTransactions: [],
        },
      })
    );

    this.transactionStore.dispatch(
      loadMonthlyTransactions({
        transactions: {
          monthlyTransactions: [],
        },
      })
    );
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

      //   this.allData = [
      //     {
      //       name: 'Transactions',
      //       series: mappedDailyAmountsToNgxCharts,
      //     },
      //   ];

      this.xAxisTicks = this.generateLineXTicks(
        5,
        mappedDailyAmountsToNgxCharts
      );
    });

    this.transactionService.getYears().subscribe((results) => {
      this.years = results.data.years.sort();
    });
  }

  formatMonthlyData(data?: MonthlyTransaction[]): BarData[] {
    let newDataLayout: BarData[] = [];

    for (let i = 0; i < this.years.length; i++) {
      newDataLayout.push({
        name: this.years.sort()[i].toString(),
        series: [],
      });
    }
    if (data) {
      for (let i = 0; i < this.years.length; i++) {
        let series: any[] = [];
        for (let j = 0; j < data.length; j++) {
          if (this.years[i] === data[j].year) {
            series.push({
              name: data[j].month,
              value: data[j].amount,
            });
            newDataLayout[i].series = series;
          }
        }
      }
    }
    return newDataLayout;
  }

  generateLineXTicks(interval: number, data?: LineDataSeries[]): string[] {
    let dates: string[] = [];
    if (data) {
      for (let i = 0; i < data.length; i = i + interval) {
        dates.push(data[i].name);
      }
      return dates;
    }
    return [];
  }

  dropDownChange(value: string): void {
    // console.log(value);
  }
  dropDownValue(value: string): void {
    if (value === 'Monthly') {
      this.isDailyData = this.isWeeklyData = false;
      this.isMonthlyData = true;
      this.subscriptions.push(
        this.monthlyAmounts$.subscribe(
          (results: MonthlyTransaction[] | undefined) => {
            this.barData = this.formatMonthlyData(results);
          }
        )
      );
      // this.transactionService.getMonthlyAmounts().subscribe((results) => {
      //   this.barData = this.formatMonthlyData(results.data.monthlyTransactions);
      // });
    } else if (value === 'Daily') {
      this.isDailyData = true;
      this.isWeeklyData = this.isMonthlyData = false;
    } else {
      this.isWeeklyData = true;
      this.isMonthlyData = this.isDailyData = false;
    }
  }

  newSelectedDate(value: NgbDate | null, isStartDate: boolean) {
    let newDate: Date;
    if (value) {
      newDate = new Date(`${value.year}-${value.month}-${value.day}`);
    }

    this.lineData = [
      {
        name: 'Transactions',
        series: this.lineData[0].series?.filter((dailyAmount) => {
          return isStartDate
            ? new Date(dailyAmount.name) >= newDate
            : new Date(dailyAmount.name) <= newDate;
        }),
      },
    ];

    this.xAxisTicks = this.generateLineXTicks(5, this.lineData[0].series);
  }

  resetGraph() {
    this.lineData = this.allData;
    this.xAxisTicks = this.generateLineXTicks(5, this.lineData[0].series);
    this.dateFilter.clearDateField();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
