import { BarData } from '../models/bar-data';
import { DataSeries } from '../models/line-data-series';
import { MonthlyExpense } from '../models/monthly-expense';

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

  formatMonthlyData(
    years: number[],
    data?: MonthlyExpense[] | null
  ): BarData[] {
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
          if (years[i] === data[j].Year) {
            series.push({
              name: this.convertMonthIntToFullName(data[j].Month),
              value: data[j].Amount,
              pctChange: data[j].PercentageChange
                ? data[j].PercentageChange
                : 'N/A',
            });
            newDataLayout[i].series = series;
          }
        }
      }
    }
    return newDataLayout;
  }

  private convertMonthIntToFullName(monthNum: string): string {
    const date = new Date();
    date.setMonth(Number(monthNum) - 1);
    return date.toLocaleString('en-us', { month: 'long' });
  }
}
