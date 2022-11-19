import { createAction, props } from '@ngrx/store';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { MovingAverageAmounts } from 'src/app/shared/models/moving-average-amounts';

const transacationsPrefix = '[Transactions] - ';

export const loadHistoricalTransactions = createAction(
  `${transacationsPrefix} Load Historical Transaction`
);

export const loadHistoricalTransactionsSucess = createAction(
  `${transacationsPrefix} Load Historical Transaction Sucess`,
  props<{
    transactions: {
      historicalTranscations?: DailyTransaction[];
      total?: number;
    };
  }>()
);

export const loadDailyTransactions = createAction(
  `${transacationsPrefix} Load All Daily Transactions`
);

export const loadDailyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load All Daily Transactions Success`,
  props<{
    transactions: DailyAmount[];
  }>()
);

export const loadMonthlyTransactions = createAction(
  `${transacationsPrefix} Load All Monthly Transactions`
);

export const loadMonthlyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load All Monthly Transactions Success`,
  props<{ monthlyTransactions?: MonthlyTransaction[] }>()
);

export const loadCategoricalAmounts = createAction(
  `${transacationsPrefix} Load Categorical Amounts`
);

export const loadCategoricalAmountsSuccess = createAction(
  `${transacationsPrefix} Load Categorical Amounts Success`,
  props<{
    transactions: {
      categoricalAmounts?: CategoricalAmounts[];
    };
  }>()
);

export const addChosenExpenseToState = createAction(
  `${transacationsPrefix} Add Selected Expense To State`,
  props<{
    expense: DailyTransaction;
  }>()
);

export const loadMovingAverage = createAction(
  `${transacationsPrefix} Load Moving Average`,
  props<{ window?: string }>()
);

export const loadMovingAverageSuccess = createAction(
  `${transacationsPrefix} Load Moving Average Success`,
  props<{
    transactions: {
      movingAverageAmounts?: MovingAverageAmounts[];
    };
  }>()
);

export const resetMovingAverageState = createAction(
  `${transacationsPrefix} Reset Moving Average`
);

export const loadCategories = createAction(
  `${transacationsPrefix} Load Categories`
);

export const loadCategoriesSuccess = createAction(
  `${transacationsPrefix} Load Categories Success`,
  props<{ categories: Category[] }>()
);
