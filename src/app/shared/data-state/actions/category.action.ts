import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/models/category';

const expensesPrefix = '[Expenses Category] - ';

export const loadCategories = createAction(`${expensesPrefix} Load Categories`);

export const loadCategoriesSuccess = createAction(
  `${expensesPrefix} Load Categories Success`,
  props<{ categories: Category[] }>()
);
