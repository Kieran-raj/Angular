import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartSettings } from 'src/app/shared/settings/chart-settings';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit {
  @Input()
  sourceData: any[] = [];
  @Input()
  xAxisTicks: any[] = [];
  @Input()
  activeEntries: any = [];

  view: any = [
    chartSettings.lineChart.xViewSize,
    chartSettings.lineChart.yViewSize,
  ];
  xAxisLabel = chartSettings.lineChart.xAxisLabel;
  yAxisLabel = chartSettings.lineChart.yAxisLabel;
  legend = chartSettings.lineChart.legend;
  legendTitle = chartSettings.lineChart.legendTitle;
  legendPosition: any = chartSettings.lineChart.legendPosition;
  xAxis = chartSettings.lineChart.xAxis;
  yAxis = chartSettings.lineChart.yAxis;
  showXAxisLabel = chartSettings.lineChart.showXAxisLabel;
  showYAxisLabel = chartSettings.lineChart.showYAxisLabel;
  scheme = chartSettings.lineChart.scheme;

  constructor() {}

  ngOnInit(): void {}
}
