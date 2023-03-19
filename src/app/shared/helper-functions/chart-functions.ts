import { DataSeries } from '../models/line-data-series';

export class ChartHelper {
  constructor() {}

  generateLineXTicks(interval: number, data?: DataSeries[]): string[] {
    let dates: string[] = [];
    if (data) {
      for (let i = 0; i < data.length; i = i + interval) {
        dates.push(data[i].name);
      }
      return dates;
    }
    return [];
  }
}
