import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from '../states/transactions.state';

export const transactionsfeatureKey = 'transactions';

export const selectTransactionsState = createFeatureSelector<TransactionState>(
  transactionsfeatureKey
);

export const selectDailyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.dailyTransactions?.transactions
);

export const selectMonthlyTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.monthlyTransactions?.monthlyTransactions
);

export const selectHistoricTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.historicalTransactions?.transactions
);

export const selectTotalAmount = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.historicalTransactions?.transactionTotal
);

export const selectChosenExpense = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.chosenExpense
);
