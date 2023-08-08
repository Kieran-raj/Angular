import { createReducer, on } from '@ngrx/store';
import {
  loadCategories,
  loadCategoriesSuccess,
} from '../actions/category.action';
import { CategoryState } from '../states/category.state';

export const initialCategoryState: CategoryState = {
  categories: null,
};

export const categoryReducer = createReducer(
  initialCategoryState,
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
