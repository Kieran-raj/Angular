import { CategoricalAmounts } from './categorical-amounts';
import { DailyTransaction } from './daily-transaction';
import { MonthlyTransaction } from './monthly-transaction';

export interface Transactions {
  /**
   * Transaction data
   */
  data: {
    /**
     * Transactions total
     */
    total?: number;

    /**
     * Daily Transactions
     */
    transactions?: DailyTransaction[];

    /**
     * Weekly Transactins
     */
    weeklyTransactions?: any[];

    /**
     * Monthly Transactions
     */
    monthlyTransactions?: MonthlyTransaction[];

    /**
     * Categorical Amounts
     */
    categoricalAmounts: CategoricalAmounts[];
  };
}
