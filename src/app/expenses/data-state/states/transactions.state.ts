import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { Transactions } from 'src/app/shared/models/transactions';

export interface TransactionState {
  /**
   * Historical Transactions
   */
  historicalTransactions?: {
    transactionTotal?: number;
    transactions?: DailyTransaction[];
  };

  /**
   * Daily Transactions
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
   * Chosen expense
   */
  chosenExpense: DailyTransaction | null;

  /**
   * IsLoading
   */
  isLoading: boolean;
}
