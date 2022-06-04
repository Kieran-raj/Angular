import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { Transactions } from 'src/app/shared/models/transactions';

export interface TransactionState {
  /**
   * All transactions
   */
  dailyTransactions?: {
    transactionTotal?: number;
    transactions?: DailyTransaction[];
  };

  /**
   * Monthly Transactions
   */
  monthlyTransactions?: {
    monthlyTransactions?: MonthlyTransaction[];
  };

  /**
   * IsLoading
   */
  isLoading: boolean;
}
