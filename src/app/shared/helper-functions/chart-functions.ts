import { DataSeries } from '../models/line-data-series';

export class ChartHelper {
  constructor() {}

  generateLineXTicks(
    interval: number,
    data?: DataSeries[],
    convertToUserFriednlyDate = false
  ): string[] {
    let dates: string[] = [];
    if (data) {
      for (let i = 0; i < data.length; i = i + interval) {
        const stringDate = data[i].name;
        convertToUserFriednlyDate
          ? dates.push(this.convertDateToUserFriendly(stringDate))
          : dates.push(stringDate);
      }
      return dates;
    }
    return [];
  }

  public convertDateToUserFriendly(date: string): string {
    const dateTime = new Date(date);

    return dateTime.toLocaleString('default', {
      month: 'short',
      year: '2-digit',
      day: '2-digit'
    });
  }
}
