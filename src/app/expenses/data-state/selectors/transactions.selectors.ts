import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const selectExpenses = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.expenses
);

export const selectChosenExpense = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.chosenExpense
);

export const selectCategoricalAmounts = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.categoricalAmounts
);

export const selectCategories = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.categories
);

export const selectMonthlyInsAndOuts = createSelector(
  selectTransactionsState,
  (state: TransactionState) => state.monthlyInsAndOuts
);
