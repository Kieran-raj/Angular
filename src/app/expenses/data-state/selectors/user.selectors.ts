import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';
import { UserState } from '../states/user.state';

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

export const selectIsLoggingIn = createSelector(
  selectUserState,
  (state: UserState) => state.isLoggingIn
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
