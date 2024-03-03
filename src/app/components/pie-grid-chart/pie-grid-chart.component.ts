import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PieData } from 'src/app/shared/models/pie-data';

@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieGridChartComponent implements OnInit {
  @Input()
  sourceData: PieData[] = [];

  customColors = {
    food: '#233D53',
    transport: '#064B73',
    subscription: '#47B5FF',
    shopping: '#256D85',
    other: '#FA532E'
  };

  view: any;
  gradient = false;
  showLegend = false;
  legendPosition: any = 'below';
  isDoughnut = false;
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

  constructor() {
    if (window.innerWidth <= 500) {
      this.view = [540, 270];
    } else {
      this.view = [625, 270];
    }
  }

  ngOnInit(): void {}

  public getPercentage(category: string) {
    const categoryData = this.sourceData.find((data) => {
      return data.name === category;
    });

    return categoryData?.pctOfTotal;
  }

  public capitalise(word: string): string {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }
}
