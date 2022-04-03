import { createAction, props } from '@ngrx/store';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';

const transacationsPrefix = '[Transactions] - ';

export const loadDailyTransactions = createAction(
  `${transacationsPrefix} Load Daily Transactions`,
  props<{
    transactions: {
      transactionTotal: number;
      transactions: DailyTransaction[];
    };
  }>()
);

export const loadDailyTransactionsSuccess = createAction(
  `${transacationsPrefix} Load Daily Transactions Success`,
  props<{
    transactions: {
      transactionTotal?: number;
      transactions?: DailyTransaction[];
    };
  }>()
);
