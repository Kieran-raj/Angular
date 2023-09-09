import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';

const userPrefix = `[User] - `;

export const resetError = createAction(`${userPrefix} Reset error`);

export const setToken = createAction(
  `${userPrefix} Set Token`,
  props<{ token: string }>()
);

export const setUserInfo = createAction(
  `${userPrefix} Set User Info`,
  props<{ user: User }>()
);

export const updateUserDetails = createAction(
  `${userPrefix} Update User Details`,
  props<{ user: User }>()
);

export const updateUserDetailsSuccess = createAction(
  `${userPrefix} Update User Details Success`,
  props<{ user: User }>()
);

export const updateUserDetailsFailure = createAction(
  `${userPrefix} Update User Details Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const deleteUserAccount = createAction(
  `${userPrefix} Delete User Account`,
  props<{ user: User }>()
);

export const deleteUserAccountSuccess = createAction(
  `${userPrefix} Delete User Account Success`
);

export const deleteUserAccountFailure = createAction(
  `${userPrefix} Delete User Account Failure`,
  props<{ error: HttpErrorResponse }>()
);
