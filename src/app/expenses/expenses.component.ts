import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transaction.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  pageTitle: string = 'Expenses';
  data: any = [];

  view: any = [700, 350];
  legend: boolean = true;
  legendPosition: string = 'below';
  showLabels: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Amount (£)';
  xAxisTicks: any[] = [];
  tooltipTemplate: any[] = [];

  formattedData: any = [
    {
      name: 'Transactions',
      series: [],
    },
  ];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAmountsOnly().subscribe((results) => {
      this.data = this.formatData(results.data.transaction);
      this.xAxisTicks = this.generateXTicks(results.data.transaction);
      this.tooltipTemplate = this.tooltipTemplateGenerator(
        results.data.transaction
      );
    });
  }

  formatData(data: []): any {
    let series: any = [];
    let newData = this.formattedData;
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

  generateXTicks(data: []): any[] {
    let dates: any[] = [];
    for (let i = 0; i < data.length; i = i + 6) {
      dates.push(data[i]['date']);
    }
    return dates;
  }

  tooltipTemplateGenerator(data: []): any[] {
    let template: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let format = {};
      format = {
        name: data[i]['date'],
        value: `£${data[i]['amount']}`,
      };
      template.push(format);
    }
    return template;
  }
}
