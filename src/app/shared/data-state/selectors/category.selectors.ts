import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from '../states/category.state';

export const categoryfeatureKey = 'category';

export const selectCategoryState =
  createFeatureSelector<CategoryState>(categoryfeatureKey);

export const selectCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);
