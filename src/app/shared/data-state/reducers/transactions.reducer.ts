import { createReducer, on } from '@ngrx/store';
import {
  addChosenExpenseToState,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadDailyExpenses,
  loadDailyExpensesSuccess,
  loadExpenses,
  loadExpensesSuccess,
  loadMonthlyInsAndOutsSuccess,
  loadMonthlyBreakDownSuccess,
  clearState,
  loadUserUpcomingExpenses,
  loadUserUpcomingExpensesSuccess,
  loadUserUpcomingExpensesFailed
} from '@shared/data-state/actions/transactions.action';
import { TransactionState } from '@shared/data-state/states/transactions.state';

export const intitialTransactions: TransactionState = {
  expenses: null,
  dailyTransactions: null,
  categoricalAmounts: null,
  chosenExpense: null,
  monthlyInsAndOuts: null,
  monthlyBreakdown: null,
  upcomingExpenses: null
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyExpenses, (state) => {
    return {
      ...state
    };
  }),
  on(loadDailyExpensesSuccess, (state, action): TransactionState => {
    return {
      ...state,
      dailyTransactions: action.transactions
    };
  }),
  on(loadExpenses, (state): TransactionState => {
    return {
      ...state
    };
  }),
  on(loadExpensesSuccess, (state, action): TransactionState => {
    return {
      ...state,
      expenses: action.expenses
    };
  }),
  on(addChosenExpenseToState, (state, action): TransactionState => {
    return {
      ...state,
      chosenExpense: action.expense
    };
  }),
  on(loadCategoricalAmounts, (state): TransactionState => {
    return {
      ...state
    };
  }),
  on(loadCategoricalAmountsSuccess, (state, action): TransactionState => {
    return {
      ...state,
      categoricalAmounts: action.transactions
    };
  }),

  on(loadMonthlyInsAndOutsSuccess, (state, action): TransactionState => {
    return {
      ...state,
      monthlyInsAndOuts: action.monthlyInsAndOuts
    };
  }),
  on(loadMonthlyBreakDownSuccess, (state, action): TransactionState => {
    return {
      ...state,
      monthlyBreakdown: action.amounts
    };
  }),
  on(clearState, () => {
    return intitialTransactions;
  }),
  on(loadUserUpcomingExpensesSuccess, (state, action): TransactionState => {
    return {
      ...state,
      upcomingExpenses: action.expenses
    };
  }),
  on(loadUserUpcomingExpensesFailed, (state, action): TransactionState => {
    return {
      ...state,
      upcomingExpenses: null
    };
  })
);
