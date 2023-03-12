import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyExpense } from 'src/app/shared/models/monthly-expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { MovingAverageAmounts } from 'src/app/shared/models/moving-average-amounts';

export interface TransactionState {
  /**
   * Historical Transactions
   */
  expenses: Expense[] | null;

  /**
   * Daily Transactions
   */
  dailyTransactions: DailyAmount[] | null | undefined;

  /**
   * Monthly Transactions
   */
  monthlyTransactions: MonthlyExpense[] | null | undefined;

  /**
   * Categorical Amounts.
   */
  categoricalAmounts: CategoricalAmounts[] | null | undefined;

  /**
   * Chosen expense
   */
  chosenExpense: Expense | null;

  /**
   * Moving Average amounts
   */
  movingAverageAmounts: MovingAverageAmounts[] | null | undefined;

  /**
   * Categories
   */
  categories: Category[] | null;

  /**
   * Monthly Ins and Outs
   */
  monthlyInsAndOuts: MonthlyInOut[] | null;
}
