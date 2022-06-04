import { createAction, props } from '@ngrx/store';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';

const transacationsPrefix = '[Transactions] - ';

export const loadDailyTransactions = createAction(
  `${transacationsPrefix} Load All Daily Transactions`,
  props<{
    transactions: {
      transactionTotal: number;
      transactions: DailyTransaction[];
    };
  }>()
);

export const loadDailyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load All Daily Transactions Success`,
  props<{
    transactions: {
      transactionTotal?: number;
      transactions?: DailyTransaction[];
    };
  }>()
);

export const loadMonthlyTransactions = createAction(
  `${transacationsPrefix} Load All Monthly Transactions`,
  props<{
    transactions: {
      monthlyTransactions: MonthlyTransaction[];
    };
  }>()
);

export const loadMonthlyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load All Monthly Transactions Success`,
  props<{
    transactions: {
      monthlyTransactions?: MonthlyTransaction[];
    };
  }>()
);
