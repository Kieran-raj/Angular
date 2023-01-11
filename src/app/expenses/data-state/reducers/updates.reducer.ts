import { createReducer, on } from '@ngrx/store';
import { addChosenExpenseToState } from '../actions/transactions.action';
import {
  addNewCategory,
  addNewCategorySuccess,
  addNewTransaction,
  addNewTransactionSuccess,
  addSelectedExpenseToState,
} from '../actions/updates.action';
import { UpdateState } from '../states/update.state';

export const initialUpdates: UpdateState = {
  categoryUpdate: null,
  transactionCreateUpdate: null,
  modifiedExpense: null,
};

export const updatesReducer = createReducer(
  initialUpdates,
  on(addNewCategory, (state, action) => {
    return {
      ...state,
      categoryUpdate: {
        newCategory: action.category,
        isUpdated: false,
      },
    };
  }),
  on(addNewCategorySuccess, (state, action) => {
    return {
      ...state,
      categoryUpdate: {
        newCategory: null,
        isUpdated: action.isUpdated,
      },
    };
  }),
  on(addNewTransaction, (state, action) => {
    return {
      ...state,
      transactionCreateUpdate: {
        newTransaction: action.updates,
        isUpdate: false,
      },
    };
  }),
  on(addNewTransactionSuccess, (state, action) => {
    return {
      ...state,
      transactionCreateUpdate: {
        newTransaction: null,
        isUpdate: action.isUpdated,
      },
    };
  }),
  on(addSelectedExpenseToState, (state, action) => {
    return {
      ...state,
      modifiedExpense: {
        chosenExpense: action.expense,
        action: action.action,
      },
    };
  })
);
