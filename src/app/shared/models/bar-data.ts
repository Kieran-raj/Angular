import { MonthlyTransaction } from './monthly-transaction';

export interface BarData {
  /**
   * Year
   */
  name: string;

  /**
   * Series data for the year
   */
  series: MonthlyTransaction[];
}
