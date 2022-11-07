import { CategoricalAmounts } from './categorical-amounts';
import { DailyTransaction } from './daily-transaction';
import { MonthlyTransaction } from './monthly-transaction';
import { MovingAverageAmounts } from './moving-average-amounts';

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
     * Weekly Transactions
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

    /**
     * Moving Average Amounts
     */
    movingAverageAmounts?: MovingAverageAmounts[];
  };
}
