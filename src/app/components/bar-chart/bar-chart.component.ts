import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements OnInit {
  @Input()
  sourceData: any[] = [];

  view: any = [1050, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: any = 'below';
  legendTitle: string = '';
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Amount (£)';

  constructor() {}

  ngOnInit(): void {}
}
