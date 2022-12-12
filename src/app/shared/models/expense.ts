export interface Expense {
  /**
   * Transaction id
   */
  id: number;
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
   * User id
   */
  userId: number;
}
