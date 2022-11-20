import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { LineData } from 'src/app/shared/models/line-data';
import { chartSettings } from 'src/app/shared/settings/chart-settings';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit {
  @Input()
  sourceData: LineData[] = [];
  @Input()
  xAxisTicks: any[] = [];
  @Input()
  activeEntries: any = [];
  @Input()
  isLoading: boolean;

  /**
   * Custom Tooltip template
   * @type {TemplateRef<any>}
   */
  @Input()
  public customToolTipTemplate: TemplateRef<any>;

  /**
   * Custom Tooltip template
   * @type {TemplateRef<any>}
   */
  @Input()
  public customSeriesTooltipTemplate: TemplateRef<any>;

  view: any = [
    chartSettings.lineChart.xViewSize,
    chartSettings.lineChart.yViewSize,
  ];

  // view: any = [1350, 500];
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
  colors = (value: any) => {
    switch (value) {
      case 'Transactions': {
        return '#315594';
      }
      case 'MovingAverage': {
        return '#FA532E';
      }
    }
    return '#F9F3E6';
  };

  rangeFillOpacity = 1;

  constructor() {}

  ngOnInit(): void {}
}
