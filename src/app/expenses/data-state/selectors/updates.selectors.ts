import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UpdateState } from '../states/update.state';

export const updatesFeatureKey = 'updates';

export const selectUpdatesState =
  createFeatureSelector<UpdateState>(updatesFeatureKey);

export const selectIsCategoryUpdated = createSelector(
  selectUpdatesState,
  (state: UpdateState) => state.categoryUpdate?.isUpdated
);

export const selectModifiedExpense = createSelector(
  selectUpdatesState,
  (state: UpdateState) => state.modifiedExpense
);
