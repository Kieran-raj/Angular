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
  isOutgoing: boolean;

  /**
   * Type
   */
  type: string;

  /**
   * Date
   */
  nextDate: string;
}
