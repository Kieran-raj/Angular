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

export const selectCategoricalAmounts = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.categoricalAmounts?.catergoricalAmounts
);

export const selectMovingAverageAmounts = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.movingAverageAmounts?.movingAverageAmounts
);

export const selectCategories = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.categories
);
