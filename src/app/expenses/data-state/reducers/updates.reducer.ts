import { createReducer, on } from '@ngrx/store';
import {
  addNewCategory,
  addNewCategorySuccess,
} from '../actions/updates.action';
import { UpdateState } from '../states/update.state';

export const initialUpdates: UpdateState = {
  categoryUpdate: null,
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
  })
);
