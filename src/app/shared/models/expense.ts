export interface Expense {
  /**
   * Transaction amount
   */
  amount: number;

  /**
   * Transactions category
   */
  category: string;

  /**
   * Transaction date
   */
  date: string;

  /**
   * Transaction description
   */
  description: string;

  /**
   * Transaction id
   */
  expense_id: number;
}
