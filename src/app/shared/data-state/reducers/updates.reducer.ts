import { createReducer, on } from '@ngrx/store';
import {
  addNewCategory,
  addNewCategorySuccess,
  createUpdateTransaction,
  createUpdateTransactionSuccess,
  resetUpdateState,
  addModalAction
} from '../actions/updates.action';
import { UpdateState } from '../states/update.state';

export const initialUpdates: UpdateState = {
  categoryUpdate: null,
  transactionCreateUpdate: null,
  modalAction: null
};

export const updatesReducer = createReducer(
  initialUpdates,
  on(addNewCategory, (state, action) => {
    return {
      ...state,
      categoryUpdate: {
        newCategory: action.category,
        isUpdated: false,
        action: 'new'
      }
    };
  }),
  on(addNewCategorySuccess, (state, action) => {
    return {
      ...state,
      categoryUpdate: {
        newCategory: null,
        isUpdated: action.isUpdated,
        action: null
      }
    };
  }),
  on(createUpdateTransaction, (state, action) => {
    return {
      ...state,
      transactionCreateUpdate: {
        transaction: action.updates,
        isUpdated: false,
        action: 'new'
      }
    };
  }),
  on(createUpdateTransactionSuccess, (state, action) => {
    return {
      ...state,
      transactionCreateUpdate: {
        transaction: null,
        isUpdated: action.isUpdated,
        action: null
      }
    };
  }),
  on(addModalAction, (state, action) => {
    return {
      ...state,
      modalAction: action.action
    };
  }),
  on(resetUpdateState, (_, __) => {
    return {
      categoryUpdate: null,
      transactionCreateUpdate: null,
      modalAction: null
    };
  })
);
