export interface UpcomingExpense {
  /**
   * Id
   */
  id: string;

  /**
   * Name
   */
  name: string;

  /**
   * Amount
   */
  amount: number;

  /**
   * Is outgoing
   */
  isOutGoing: boolean;

  /**
   * Type
   */
  type: string;

  /**
   * Date
   */
  date: string;
}
