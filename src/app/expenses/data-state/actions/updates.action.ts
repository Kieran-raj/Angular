import { createAction, props } from '@ngrx/store';

const updatesPrefix = `[Updates] - `;

export const addNewCategory = createAction(
  `${updatesPrefix} Add New Category`,
  props<{
    category: string;
  }>()
);

export const addNewCategorySuccess = createAction(
  `${updatesPrefix} Add New Category Success`,
  props<{ isUpdated: boolean }>()
);

export const addNewTransaction = createAction(
  `${updatesPrefix} Add New Transaction`,
  props<{
    updates: any;
  }>()
);

export const addNewTransactionSuccess = createAction(
  `${updatesPrefix} Add New Transaction Success`,
  props<{
    isUpdated: boolean;
  }>()
);
