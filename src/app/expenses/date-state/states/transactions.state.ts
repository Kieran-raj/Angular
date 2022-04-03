import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { Transactions } from 'src/app/shared/models/transactions';

export interface TransactionState {
  /**
   * All transactions
   */
  dailyTransactions?: {
    transactionTotal?: number;
    transactions?: DailyTransaction[];
  };
}
