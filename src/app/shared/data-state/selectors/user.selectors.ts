import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '@shared/data-state/states/user.state';

export const userFeatureKey = 'user';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUserToken = createSelector(
  selectUserState,
  (state: UserState) => state.userToken
);

export const selectUserInfo = createSelector(
  selectUserState,
  (state: UserState) => state.userInfo
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectIsUserUpdated = createSelector(
  selectUserState,
  (state: UserState) => state.isUserUpdated
);

export const selectIsUserDeleted = createSelector(
  selectUserState,
  (state: UserState) => state.isUserDeleted
);

export const selectUserOptionState = createSelector(
  selectUserState,
  (state: UserState) => state.userOptionState
);

export const selectUserOptionAction = (action: string) =>
  createSelector(selectUserState, (state: UserState) => {
    if (state.userOptionState !== null) {
      return state.userOptionState[action];
    }

    return {} as {
      options: any[] | null;
      isProcessing: boolean | null;
      isComplete: boolean | null;
      error: {
        message: string | null;
        statusCode: number | null;
      } | null;
    };
  });
