import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PieData } from 'src/app/shared/models/pie-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PieChartComponent implements OnInit {
  @Input()
  sourceData: PieData[] = [];

  customColors = {
    food: '#233D53',
    transport: '#064B73',
    subscription: '#47B5FF',
    shopping: '#256D85',
    other: '#FA532E',
  };

  // view: any = [700, 550];
  view: any = [525, 400];
  gradient = false;
  showLegend = false;
  legendPosition: any = 'below';
  isDoughnut = false;
  colors = (value: string) => {
    switch (value) {
      case 'Food': {
        return this.customColors.food;
      }
      case 'Transport': {
        return this.customColors.transport;
      }
      case 'Subscription': {
        return this.customColors.subscription;
      }
      case 'Shopping': {
        return this.customColors.shopping;
      }
      case 'Other': {
        return this.customColors.other;
      }
    }
    return '#F9F3E6';
  };

  constructor() {}

  ngOnInit(): void {}

  public getPercentage(category: string) {
    const categoryData = this.sourceData.find((data) => {
      return data.name === category;
    });

    return categoryData?.pctOfTotal;
  }
}
