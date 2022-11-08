import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses-bar-chart-tooltip',
  templateUrl: './expenses-bar-chart-tooltip.component.html',
  styleUrls: ['./expenses-bar-chart-tooltip.component.scss'],
})
export class ExpensesBarChartTooltipComponent implements OnInit {
  @Input()
  public model: any;

  constructor() {}

  ngOnInit(): void {}
}
