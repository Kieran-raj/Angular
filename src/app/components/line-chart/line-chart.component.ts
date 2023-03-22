import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { LineData } from 'src/app/shared/models/line-data';
import { chartSettings } from 'src/app/shared/settings/chart-settings';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit {
  /**
   * Souce data
   * @type {LineData[] | null}
   */
  @Input()
  sourceData: LineData[] | null = [];

  /**
   * x-axis ticks
   * @type {any[]}
   */
  @Input()
  xAxisTicks: any[] = [];

  /**
   * Active entries
   * @type {any[]}
   */
  @Input()
  activeEntries: any = [];

  /**
   * Is loading
   * @type {boolean}
   */
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

  /**
   * Custom curve definition
   */
  @Input()
  public curve = shape.curveCardinal.tension(0.51);

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
    }
    return '#F9F3E6';
  };

  rangeFillOpacity = 1;

  constructor() {}

  ngOnInit(): void {}
}
