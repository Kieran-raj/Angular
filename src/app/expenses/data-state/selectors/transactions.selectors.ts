import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpensesAppState } from '../states/expenses-app.state';
import { TransactionState } from '../states/transactions.state';

export const transactionsfeatureKey = 'transactions';

export const selectTransactionsState = createFeatureSelector<TransactionState>(
  transactionsfeatureKey
);

export const selectDailyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.dailyTransactions
);

export const selectMonthlyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.monthlyTransactions
);
