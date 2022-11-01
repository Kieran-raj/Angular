import { Component, Input, OnInit } from '@angular/core';
import { PieData } from 'src/app/shared/models/pie-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input()
  sourceData: PieData[] = [];

  customColors = {
    food: '#233D53',
    transport: '#064B73',
    other: '#FA532E',
  };

  // view: any = [650, 600];
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
      case 'Other': {
        return this.customColors.other;
      }
    }
    return '#F9F3E6';
  };

  constructor() {}

  ngOnInit(): void {}
}
