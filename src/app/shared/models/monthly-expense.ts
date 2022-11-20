export interface MonthlyExpense {
  /**
   * Monthly total amount
   */
  amount: number;

  /**
   * Month
   */
  month: string;

  /**
   * Percentage Change.
   */
  pct_change: number;

  /**
   * Year
   */
  year: number;
}
