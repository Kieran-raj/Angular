import { MonthlyExpense } from './monthly-expense';

export interface BarData {
  /**
   * Year
   */
  name: string;

  /**
   * Series data for the year
   */
  series: MonthlyExpense[];
}
