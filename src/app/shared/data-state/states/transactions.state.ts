import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { UpcomingExpense } from '../../models/upcoming-expense';

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
   * Categorical Amounts.
   */
  categoricalAmounts: CategoricalAmounts[] | null | undefined;

  /**
   * Chosen expense
   */
  chosenExpense: Expense | null;

  /**
   * Monthly Ins and Outs
   */
  monthlyInsAndOuts: MonthlyInOut[] | null;

  /**
   * Monthly Breakdown
   */
  monthlyBreakdown: CategoricalAmounts[] | null;

  /**
   * Upcoming expenses
   */
  upcomingExpenses: UpcomingExpense[] | null;
}
