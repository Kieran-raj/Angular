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
      this.lineData = this.formatDailyLineBarData(results.data.transaction);
      console.log(JSON.stringify(this.lineData));
      this.xAxisTicks = this.generateLineXTicks(results.data.transaction, 5);
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

  formatMonthlyData(data: []): any {}

  generateLineXTicks(data: [], interal: number): any[] {
    let dates: any[] = [];
    for (let i = 0; i < data.length; i = i + interal) {
      dates.push(data[i]['date']);
    }
    return dates;
  }

  dropDownValue(value: string): void {
    console.log(value);
    if (value === 'Monthly') {
      this.isdailyData = !this.isdailyData;
      this.transactionService.getMonthlyAmounts().subscribe((results) => {
        console.log(JSON.stringify(results.data.transaction));
      });
    } else if (value === 'Daily') {
      this.isdailyData = true;
    }
  }
}
