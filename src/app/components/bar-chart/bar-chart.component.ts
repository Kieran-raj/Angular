import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input()
  sourceData: any[] = [];

  view: any = [1050, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: any = 'below';
  legendTitle: string = '';
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  sampleTestData: any[] = [
    {
      name: '2021',
      series: [
        {
          name: 'July',
          value: 685.15,
        },
        {
          name: 'August',
          value: 511.51,
        },
        {
          name: 'September',
          value: 711.91,
        },
        {
          name: 'October',
          value: 29.65,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
