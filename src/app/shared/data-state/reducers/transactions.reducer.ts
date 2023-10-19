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
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

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
  on(loadDailyExpensesSuccess, (state, action) => {
    return {
      ...state,
      dailyTransactions: action.transactions
    };
  }),
  on(loadExpenses, (state) => {
    return {
      ...state
    };
  }),
  on(loadExpensesSuccess, (state, action) => {
    return {
      ...state,
      expenses: action.expenses
    };
  }),
  on(addChosenExpenseToState, (state, action) => {
    return {
      ...state,
      chosenExpense: action.expense
    };
  }),
  on(loadCategoricalAmounts, (state) => {
    return {
      ...state
    };
  }),
  on(loadCategoricalAmountsSuccess, (state, action) => {
    return {
      ...state,
      categoricalAmounts: action.transactions
    };
  }),

  on(loadMonthlyInsAndOutsSuccess, (state, action) => {
    return {
      ...state,
      monthlyInsAndOuts: action.monthlyInsAndOuts
    };
  }),
  on(loadMonthlyBreakDownSuccess, (state, action) => {
    return {
      ...state,
      monthlyBreakdown: action.amounts
    };
  }),
  on(clearState, () => {
    return intitialTransactions;
  }),
  on(loadUserUpcomingExpensesSuccess, (state, action) => {
    return {
      ...state,
      upcomingExpenses: action.expenses
    };
  }),
  on(loadUserUpcomingExpensesFailed, (state, __) => {
    return {
      ...state,
      upcomingExpenses: null
    };
  })
);
