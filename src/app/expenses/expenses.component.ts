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
  frequency: string = 'daily'

  view: any = [1050, 350];
  legendPosition: string = 'below';
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Amount (£)';
  xAxisTicks: any[] = [];

  dropDownValues = ['Daily', 'Weekly', 'Monthly']

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAmountsOnly().subscribe((results) => {
      this.lineData = this.formatLineBarData(results.data.transaction);
      this.xAxisTicks = this.generateLineXTicks(results.data.transaction);
    });
  }

  formatLineBarData(data: []): any {
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

  generateLineXTicks(data: []): any[] {
    let dates: any[] = [];
    for (let i = 0; i < data.length; i = i + 5) {
      dates.push(data[i]['date']);
    }
    return dates;
  }
}
