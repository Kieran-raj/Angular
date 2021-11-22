import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transaction.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  pageTitle: string = 'Expenses';
  lineData: any = [];
  barData: any = [];
  isdailyData: boolean = true;

  view: any = [1050, 350];
  legendPosition: string = 'below';
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Amount (£)';
  xAxisTicks: any[] = [];

  dropDownValues = ['Daily', 'Weekly', 'Monthly'];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAmountsOnly().subscribe((results) => {
      this.lineData = this.formatDailyLineBarData(results.data.dailyAmounts);
      this.xAxisTicks = this.generateLineXTicks(results.data.dailyAmounts, 5);
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

  sampleInput = [
    {
      amount: 685.15,
      month: 'July',
      year: 2021,
    },
    {
      amount: 511.51,
      month: 'August',
      year: 2021,
    },
    {
      amount: 711.91,
      month: 'September',
      year: 2021,
    },
    {
      amount: 29.65,
      month: 'October',
      year: 2021,
    },
  ];

  formatMonthlyData(data: []): any {}

  generateLineXTicks(data: [], interal: number): any[] {
    let dates: any[] = [];
    for (let i = 0; i < data.length; i = i + interal) {
      dates.push(data[i]['date']);
    }
    return dates;
  }

  dropDownValue(value: string): void {
    if (value === 'Monthly') {
      this.isdailyData = !this.isdailyData;
      this.transactionService.getMonthlyAmounts().subscribe((results) => {
        console.log(JSON.stringify(results.data.monthlyAmounts));
      });
    } else if (value === 'Daily') {
      this.isdailyData = true;
    }
  }
}
