import { createReducer, on } from '@ngrx/store';
import {
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
  loadHistoricalTransactions,
  loadHistoricalTransactionsSucess,
  loadMonthlyTransactions,
  loadMonthlyTransactionsSuccess,
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

export const intitialTransactions: TransactionState = {
  historicalTransactions: {
    transactionTotal: 0,
    transactions: [],
  },
  dailyTransactions: {
    transactions: [],
  },
  monthlyTransactions: {
    monthlyTransactions: [],
  },
  isLoading: false,
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyTransactions, (state) => {
    return {
      ...state,
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
  on(loadMonthlyTransactions, (state) => {
    return {
      ...state,
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
  }),
  on(loadHistoricalTransactions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadHistoricalTransactionsSucess, (state, action) => {
    return {
      ...state,
      historicalTransactions: {
        transactionTotal: action.transactions.total,
        transactions: action.transactions.historicalTranscations,
      },
      isLoading: false,
    };
  })
);
