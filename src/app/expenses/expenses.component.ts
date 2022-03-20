// TODO: NEED TO ADD TYPES TO ALL MISSING TYPES
// TODO: Need to add a loading wheel
// TODO: Need to add a no data found
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from './transaction.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  pageTitle: string = 'Expenses';
  lineData: any = [];
  movingAverageData: any = [];
  barData: any = [];
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

  movingAverageToggle: boolean = false;
  dropDownValues = ['Daily', 'Weekly', 'Monthly'];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAmountsOnly().subscribe((results) => {
      this.lineData = this.formatDailyLineBarData(results.data.dailyAmounts);
      this.xAxisTicks = this.generateLineXTicks(results.data.dailyAmounts, 5);
    });

    this.transactionService.getYears().subscribe((results) => {
      this.years = results.data.years.sort();
    });
  }

  formatDailyLineBarData(data: []): any {
    let series: any = [];
    let newData = [
      {
        name: 'Transactions',
        series: [],
      },
    ];
    for (let i = 0; i < data.length; i++) {
      let newFormat: any = {};
      newFormat = {
        name: data[i]['date'],
        value: data[i]['amount'],
      };
      series.push(newFormat);
    }
    newData[0].series = series;
    return newData;
  }

  formatMonthlyData(data: any[]): any {
    let newDataLayout: any[] = [];

    for (let i = 0; i < this.years.length; i++) {
      newDataLayout.push({
        name: this.years.sort()[i].toString(),
        series: [],
      });
    }
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
    return newDataLayout;
  }

  generateLineXTicks(
    data: [],
    interval: number,
    dateColumn: string = 'date'
  ): string[] {
    let dates: string[] = [];
    for (let i = 0; i < data.length; i = i + interval) {
      dates.push(data[i][dateColumn]);
    }
    return dates;
  }

  dropDownValue(value: string): void {
    if (value === 'Monthly') {
      this.isDailyData = false;
      this.isWeeklyData = false;
      this.isMonthlyData = true;
      this.transactionService.getMonthlyAmounts().subscribe((results) => {
        this.barData = this.formatMonthlyData(results.data.monthlyAmounts);
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

  newSelectedStartDate(value: NgbDate) {
    const newStartData = new Date(`${value.year}-${value.month}-${value.day}`);
    const filteredData = this.lineData[0]['series'].filter(
      (dailyAmount: any) => new Date(dailyAmount.name) >= newStartData
    );
    this.lineData = [{ name: 'Transcations', series: filteredData }];
    this.xAxisTicks = this.generateLineXTicks(
      this.lineData[0]['series'],
      5,
      'name'
    );
  }

  newSelectedEndDate(value: NgbDate) {
    const newEndDate = new Date(`${value.year}-${value.month}-${value.day}`);
    const filteredData = this.lineData[0]['series'].filter(
      (dailyAmount: any) => new Date(dailyAmount.name) <= newEndDate
    );
    this.lineData = [{ name: 'Transcations', series: filteredData }];
    this.xAxisTicks = this.generateLineXTicks(
      this.lineData[0]['series'],
      5,
      'name'
    );
  }
}
