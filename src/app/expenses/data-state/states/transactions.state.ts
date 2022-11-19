import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { MovingAverageAmounts } from 'src/app/shared/models/moving-average-amounts';

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
  dailyTransactions: DailyAmount[] | null | undefined;

  /**
   * Monthly Transactions
   */
  monthlyTransactions: MonthlyTransaction[] | null | undefined;

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

  /**
   * Moving Average amounts
   */
  movingAverageAmounts: {
    movingAverageAmounts?: MovingAverageAmounts[];
  } | null;

  categories: Category[] | null;
}
