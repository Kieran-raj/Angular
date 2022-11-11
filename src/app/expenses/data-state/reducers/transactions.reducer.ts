import { createReducer, on } from '@ngrx/store';
import {
  addChosenExpenseToState,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadCategories,
  loadCategoriesSuccess,
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
  loadHistoricalTransactions,
  loadHistoricalTransactionsSucess,
  loadMonthlyTransactions,
  loadMonthlyTransactionsSuccess,
  loadMovingAverage,
  loadMovingAverageSuccess,
  resetMovingAverageState,
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

export const intitialTransactions: TransactionState = {
  historicalTransactions: null,
  dailyTransactions: null,
  monthlyTransactions: null,
  categoricalAmounts: null,
  chosenExpense: null,
  movingAverageAmounts: null,
  categories: null,
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyTransactions, (state) => {
    return {
      ...state,
    };
  }),
  on(loadDailyTransactionsSuccess, (state, action) => {
    return {
      ...state,
      dailyTransactions: {
        transactions: action.transactions.dailyTransactions,
      },
    };
  }),
  on(loadMonthlyTransactions, (state) => {
    return {
      ...state,
    };
  }),
  on(loadMonthlyTransactionsSuccess, (state, action) => {
    return {
      ...state,
      monthlyTransactions: {
        monthlyTransactions: action.transactions.monthlyTransactions,
      },
    };
  }),
  on(loadHistoricalTransactions, (state) => {
    return {
      ...state,
    };
  }),
  on(loadHistoricalTransactionsSucess, (state, action) => {
    return {
      ...state,
      historicalTransactions: {
        transactionTotal: action.transactions.total,
        transactions: action.transactions.historicalTranscations,
      },
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
      categoricalAmounts: {
        catergoricalAmounts: action.transactions.categoricalAmounts,
      },
    };
  }),
  on(loadMovingAverage, (state) => {
    return {
      ...state,
    };
  }),
  on(loadMovingAverageSuccess, (state, action) => {
    return {
      ...state,
      movingAverageAmounts: {
        movingAverageAmounts: action.transactions.movingAverageAmounts,
      },
    };
  }),
  on(resetMovingAverageState, (state) => {
    return {
      ...state,
      movingAverageAmounts: null,
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
  })
);
