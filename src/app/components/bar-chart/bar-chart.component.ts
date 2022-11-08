import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BarData } from 'src/app/shared/models/bar-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements OnInit {
  @Input()
  sourceData: BarData[] = [];

  /**
   * Custom Tooltip template
   * @type {TemplateRef<any>}
   */
  @Input()
  public customToolTipTemplate: TemplateRef<any>;

  view: any = [1050, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: any = 'below';
  legendTitle = '';
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Amount (£)';
  scheme = 'vivid';

  constructor() {}

  ngOnInit(): void {}
}
