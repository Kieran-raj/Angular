export interface MonthlyExpense {
  /**
   * Monthly total amount
   */
  Amount: number;

  /**
   * Month
   */
  Month: string;

  /**
   * Percentage Change.
   */
  PercentageChange: number;

  /**
   * Year
   */
  Year: number;
}
