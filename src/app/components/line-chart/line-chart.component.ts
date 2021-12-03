import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input()
  sourceData: any[] = [];
  @Input()
  view: any = [];
  @Input()
  xAxisLabel: string = '';
  @Input()
  yAxisLabel: string = '';
  @Input()
  xAxisTicks: any[] = [];
  @Input()
  legend: boolean = true;
  @Input()
  legendTitle: string = '';
  @Input()
  legendPosition: any = '';

  xAxis: boolean = true;
  yAxis: boolean = true;

  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
