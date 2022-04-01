// TODO: NEED TO ADD TYPES TO ALL MISSING TYPES
// TODO: Need to add a loading wheel
// TODO: Need to add a no data found
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BarData } from '../shared/models/bar-data';
import { DailyAmount } from '../shared/models/daily-amount-data';
import { DailyTransaction } from '../shared/models/daily-transaction';
import { LineData } from '../shared/models/line-data';
import { LineDataSeries } from '../shared/models/line-data-series';
import { MonthlyTransaction } from '../shared/models/monthly-transaction';
import { TransactionsService } from './transaction.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  pageTitle: string = 'Expenses';
  allData: LineData[];
  lineData: LineData[];
  movingAverageData: any = [];
  barData: BarData[] = [];
  years: number[] = [];
  isDailyData: boolean = true;
  isWeeklyData: boolean = false;
  isMonthlyData: boolean = false;
  view: number[] = [1050, 350];
  legendPosition: string = 'below';
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Amount (£)';
  xAxisTicks: string[] = [];
  startDate = 'Start Date';
  endDate = 'End Date';

  clearDatePicker = false;
  movingAverageToggle: boolean = false;
  dropDownValues = ['Daily', 'Weekly', 'Monthly'];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAmountsOnly().subscribe((results) => {
      const mappedDailyAmountsToNgxCharts = results.data.transactions?.map(
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

      this.allData = [
        {
          name: 'Transactions',
          series: mappedDailyAmountsToNgxCharts,
        },
      ];

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

  dropDownValue(value: string): void {
    if (value === 'Monthly') {
      this.isDailyData = false;
      this.isWeeklyData = false;
      this.isMonthlyData = true;
      this.transactionService.getMonthlyAmounts().subscribe((results) => {
        this.barData = this.formatMonthlyData(results.data.monthlyTransactions);
      });
    } else if (value === 'Daily') {
      this.isDailyData = true;
      this.isWeeklyData = false;
      this.isMonthlyData = false;
    } else {
      this.isWeeklyData = true;
      this.isMonthlyData = false;
      this.isDailyData = false;
    }
  }

  setToggleValue(value: Event) {
    if (!value.defaultPrevented) {
      this.movingAverageToggle = !this.movingAverageToggle;
    }
  }

  newSelectedStartDate(value: NgbDate | null) {
    let newStartDate: Date;
    if (value) {
      newStartDate = new Date(`${value.year}-${value.month}-${value.day}`);
    }

    const filteredData = this.allData[0].series?.filter(
      (dailyAmount) => new Date(dailyAmount.name) >= newStartDate
    );
    this.lineData = [{ name: 'Transcations', series: filteredData }];
    this.xAxisTicks = this.generateLineXTicks(5, this.lineData[0].series);
  }

  newSelectedEndDate(value?: NgbDate | null) {
    let newEndDate: Date;
    if (value) {
      newEndDate = new Date(`${value.year}-${value.month}-${value.day}`);
    }

    const filteredData = this.allData[0].series?.filter(
      (dailyAmount) => new Date(dailyAmount.name) <= newEndDate
    );
    this.lineData = [{ name: 'Transcations', series: filteredData }];
    this.xAxisTicks = this.generateLineXTicks(5, this.lineData[0].series);
  }

  resetGraph() {
    this.lineData = this.allData;
    this.xAxisTicks = this.generateLineXTicks(5, this.lineData[0].series);
    this.clearDatePicker = true;
  }
}
