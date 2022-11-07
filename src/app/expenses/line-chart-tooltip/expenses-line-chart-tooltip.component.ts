import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses-line-chart-tooltip',
  templateUrl: './expenses-line-chart-tooltip.component.html',
  styleUrls: ['./expenses-line-chart-tooltip.component.scss'],
})
export class ExpensesLineChartTooltipComponent implements OnInit {
  @Input()
  public model: any;

  @Input()
  public isSeriesTooltip: boolean;

  constructor() {}

  ngOnInit(): void {}

  formatDate(date: string): string {
    const utc = new Date(Date.parse(date));
    return utc.toDateString();
  }
}
