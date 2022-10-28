import { BarData } from '../models/bar-data';
import { LineDataSeries } from '../models/line-data-series';
import { MonthlyTransaction } from '../models/monthly-transaction';

export class ChartHelper {
  constructor() {}

  generateLineXTicks(interval: number, data?: LineDataSeries[]): string[] {
    let dates: string[] = [];
    if (data) {
      for (let i = 0; i < data.length; i = i + interval) {
        dates.push(data[i].name);
      }
      return dates;
    }
    return [];
  }

  formatMonthlyData(years: number[], data?: MonthlyTransaction[]): BarData[] {
    let newDataLayout: BarData[] = [];
    for (let i = 0; i < years.length; i++) {
      newDataLayout.push({
        name: years.sort()[i].toString(),
        series: [],
      });
    }
    if (data) {
      for (let i = 0; i < years.length; i++) {
        let series: any[] = [];
        for (let j = 0; j < data.length; j++) {
          if (years[i] === data[j].year) {
            series.push({
              name: data[j].month,
              value: data[j].amount,
            });
            newDataLayout[i].series = series;
          }
        }
      }
    }
    return newDataLayout;
  }
}
