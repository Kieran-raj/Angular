import { createAction, props } from '@ngrx/store';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';

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
    transactions: {
      dailyTransactions?: DailyTransaction[];
    };
  }>()
);

export const loadMonthlyTransactions = createAction(
  `${transacationsPrefix} Load All Monthly Transactions`
);

export const loadMonthlyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load All Monthly Transactions Success`,
  props<{
    transactions: {
      monthlyTransactions?: MonthlyTransaction[];
    };
  }>()
);

export const addChosenExpenseToState = createAction(
  `${transacationsPrefix} Add Selected Expense To State`,
  props<{
    expense: DailyTransaction;
  }>()
);
