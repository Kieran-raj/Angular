import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import {
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
  loadMonthlyTransactions,
  loadMonthlyTransactionsSuccess,
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

export const intitialTransactions: TransactionState = {
  dailyTransactions: {
    transactionTotal: 0,
    transactions: [],
  },
  monthlyTransactions: {
    monthlyTransactions: [],
  },
  isLoading: false,
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyTransactions, (state, action) => {
    return {
      ...state,
      dailyTransactions: {
        transactions: action.transactions.dailyTransactions,
      },
      isLoading: true,
    };
  }),
  on(loadDailyTransactionsSuccess, (state, action) => {
    return {
      ...state,
      dailyTransactions: {
        transactions: action.transactions.dailyTransactions,
      },
      isLoading: false,
    };
  }),
  on(loadMonthlyTransactions, (state, action) => {
    return {
      ...state,
      monthlyTransactions: {
        monthlyTransactions: action.transactions.monthlyTransactions,
      },
      isLoading: true,
    };
  }),
  on(loadMonthlyTransactionsSuccess, (state, action) => {
    return {
      ...state,
      monthlyTransactions: {
        monthlyTransactions: action.transactions.monthlyTransactions,
      },
      isLoading: false,
    };
  })
);
