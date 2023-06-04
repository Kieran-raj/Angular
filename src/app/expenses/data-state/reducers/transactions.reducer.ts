import { createReducer, on } from '@ngrx/store';
import {
  addChosenExpenseToState,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadCategories,
  loadCategoriesSuccess,
  loadDailyExpenses,
  loadDailyExpensesSuccess,
  loadAllExpenses,
  loadAllExpensesSuccess,
  loadMonthlyExpense,
  loadMonthlyExpenseSuccess,
  loadMonthlyInsAndOutsSuccess,
  loadMonthlyBreakDownSuccess,
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

export const intitialTransactions: TransactionState = {
  expenses: null,
  dailyTransactions: null,
  monthlyTransactions: null,
  categoricalAmounts: null,
  chosenExpense: null,
  categories: null,
  monthlyInsAndOuts: null,
  monthlyBreakdown: null,
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyExpenses, (state) => {
    return {
      ...state,
    };
  }),
  on(loadDailyExpensesSuccess, (state, action) => {
    return {
      ...state,
      dailyTransactions: action.transactions,
    };
  }),
  on(loadMonthlyExpense, (state) => {
    return {
      ...state,
    };
  }),
  on(loadMonthlyExpenseSuccess, (state, action) => {
    return {
      ...state,
      monthlyTransactions: action.monthlyTransactions,
    };
  }),
  on(loadAllExpenses, (state) => {
    return {
      ...state,
    };
  }),
  on(loadAllExpensesSuccess, (state, action) => {
    return {
      ...state,
      expenses: action.expenses,
    };
  }),
  on(addChosenExpenseToState, (state, action) => {
    return {
      ...state,
      chosenExpense: action.expense,
    };
  }),
  on(loadCategoricalAmounts, (state) => {
    return {
      ...state,
    };
  }),
  on(loadCategoricalAmountsSuccess, (state, action) => {
    return {
      ...state,
      categoricalAmounts: action.transactions,
    };
  }),
  on(loadCategories, (state) => {
    return {
      ...state,
    };
  }),
  on(loadCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories,
    };
  }),
  on(loadMonthlyInsAndOutsSuccess, (state, action) => {
    return {
      ...state,
      monthlyInsAndOuts: action.monthlyInsAndOuts,
    };
  }),
  on(loadMonthlyBreakDownSuccess, (state, action) => {
    return {
      ...state,
      monthlyBreakdown: action.amounts,
    };
  })
);
