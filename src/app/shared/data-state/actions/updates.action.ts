import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/shared/models/expense';

const updatesPrefix = `[Expenses Updates] - `;

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

export const createUpdateTransaction = createAction(
  `${updatesPrefix} Add New Transaction`,
  props<{
    updates: any;
    action?: string;
  }>()
);

export const createUpdateTransactionSuccess = createAction(
  `${updatesPrefix} Add New Transaction Success`,
  props<{
    isUpdated: boolean;
  }>()
);

export const addModalAction = createAction(
  `${updatesPrefix} Add Modal Action To State`,
  props<{ action: string | null }>()
);

export const resetUpdateState = createAction(
  `${updatesPrefix} Reset Update State`
);

export const deleteTransaction = createAction(
  `${updatesPrefix} Delete Transaction`,
  props<{ expense: Expense | null }>()
);

export const deleteTransactionSuccess = createAction(
  `${updatesPrefix} Delete Transaction Success`
);
