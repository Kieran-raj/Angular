import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';
import { UserOption } from '../../models/user-option';

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

export const addUserOptionToState = createAction(
  `${userPrefix} Add User Option To State`,
  props<{ userOptionId: string; action: string }>()
);

export const deleteUserOption = createAction(
  `${userPrefix} Delete User Option`,
  props<{ userOptionIds: string[] }>()
);

export const deleteUserOptionSuccess = createAction(
  `${userPrefix} Delete User Option Success`
);

export const deleteUserOptionFailure = createAction(
  `${userPrefix} Delete User Option Failure`,
  props<{ error: HttpErrorResponse }>()
);
