import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { PieData } from 'src/app/shared/models/pie-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
  @Input()
  sourceData: PieData[] = [];

  @Input()
  view: any = [];

  @Input()
  showLegend: boolean = false;

  @Input()
  legendPosition: LegendPosition = LegendPosition.Below;

  customColors = {
    food: '#233D53',
    transport: '#064B73',
    subscription: '#47B5FF',
    shopping: '#256D85',
    other: '#FA532E'
  };

  colors = (value: string) => {
    switch (value.toLowerCase()) {
      case 'food': {
        return this.customColors.food;
      }
      case 'transport': {
        return this.customColors.transport;
      }
      case 'subscription': {
        return this.customColors.subscription;
      }
      case 'shopping': {
        return this.customColors.shopping;
      }
      case 'other': {
        return this.customColors.other;
      }
    }
    return '#F9F3E6';
  };

  constructor() {}

  ngOnInit(): void {}

  public capitalise(word: string): string {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }
}
