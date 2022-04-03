import { createReducer, on } from '@ngrx/store';
import {
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
} from '../actions/transactions.action';
import { TransactionState } from '../states/transactions.state';

export const intitialTransactions: TransactionState = {
  dailyTransactions: {
    transactionTotal: 0,
    transactions: [],
  },
};

export const transactionsReducer = createReducer(
  intitialTransactions,
  on(loadDailyTransactions, (state, action) => {
    return {
      dailyTransactions: {
        transactionTotal: action.transactions.transactionTotal,
        transactions: action.transactions.transactions,
      },
    };
  }),
  on(loadDailyTransactionsSuccess, (state, action) => {
    return {
      dailyTransactions: {
        transactionTotal: action.transactions.transactionTotal,
        transactions: action.transactions.transactions,
      },
    };
  })
);
