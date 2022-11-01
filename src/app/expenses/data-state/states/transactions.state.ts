import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { Transactions } from 'src/app/shared/models/transactions';

export interface TransactionState {
  /**
   * Historical Transactions
   */
  historicalTransactions: {
    transactionTotal?: number;
    transactions?: DailyTransaction[];
  } | null;

  /**
   * Daily Transactions
   */
  dailyTransactions: {
    transactionTotal?: number;
    transactions?: DailyTransaction[];
  } | null;

  /**
   * Monthly Transactions
   */
  monthlyTransactions: {
    monthlyTransactions?: MonthlyTransaction[];
  } | null;

  /**
   * Categorical Amounts.
   */
  categoricalAmounts: {
    catergoricalAmounts?: CategoricalAmounts[];
  } | null;

  /**
   * Chosen expense
   */
  chosenExpense: DailyTransaction | null;
}
