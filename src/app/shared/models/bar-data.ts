import { MonthlyTransaction } from './monthly-transaction';

export class BarData {
  /**
   * Year
   */
  name: string;

  /**
   * Series data for the year
   */
  series: MonthlyTransaction[];
}
