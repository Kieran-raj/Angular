import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  /**
   * Source data
   * @type {any}
   */
  @Input()
  public sourceData: any = [];

  /**
   * Custome tooltip template
   * @type {TemplateRef<any>}
   */
  @Input()
  public customToolTipTemplate: TemplateRef<any>;

  /**
   * Show x-axis
   * @type {boolean}
   */
  @Input()
  public showXAxis = true;

  /**
   * Show y-axis
   * @type {boolean}
   */
  @Input()
  public showYAxis = true;

  /**
   * Show x-axis label
   * @type {boolean}
   */
  @Input()
  public showXAxisLabel = true;

  /**
   * Show y-axis label
   * @type {boolean}
   */
  @Input()
  public showYAxisLabel = true;

  /**
   * Color callback funciton
   */
  @Input()
  public colorsCallback: (args: any) => string;

  @Output()
  public selected = new EventEmitter();

  /**
   * Color scheme
   * @type {string}
   */
  @Input()
  public scheme = 'vivid';

  view: any = [750, 300];

  xAxisLabel = 'Year';

  gradient = false;
  showLegend = false;
  legendPosition: any = 'below';
  legendTitle = '';

  yAxisLabel = 'Amount (£)';

  constructor() {}

  ngOnInit(): void {
    if (window.innerWidth <= 500) {
      this.view = [750, 200];
    }
  }

  onSelect($event: Event): void {
    this.selected.emit($event);
  }
}
