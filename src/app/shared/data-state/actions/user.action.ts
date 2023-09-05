import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthToken } from 'src/app/shared/models/auth-models/auth-token';
import { SignUpMessage } from 'src/app/shared/models/auth-models/sign-up-message';
import { User } from 'src/app/shared/models/user';
import { UserDetails } from 'src/app/shared/models/user-details';

const userPrefix = `[User] - `;

export const userLogin = createAction(
  `${userPrefix} Log in`,
  props<{ email: string; password: string; isloggingIn: boolean }>()
);

export const userLoginSuccess = createAction(
  `${userPrefix} Log in success`,
  props<{ authToken: AuthToken }>()
);

export const userLoginFailure = createAction(
  `${userPrefix} Log in failure`,
  props<{ message: string; statusCode: number }>()
);

export const resetError = createAction(`${userPrefix} Reset error`);

export const setUserInfo = createAction(
  `${userPrefix} Set User Info`,
  props<{ user: User }>()
);

export const userLogOut = createAction(`${userPrefix} Log out`);

export const checkSignUpDetails = createAction(
  `${userPrefix} Check sign up details`,
  props<{ email: string; displayName: string }>()
);

export const setCheckMessage = createAction(
  `${userPrefix} Set Checking Details Message`,
  props<{ response: SignUpMessage }>()
);

export const signUp = createAction(
  `${userPrefix} Sign Up`,
  props<{ userDetails: UserDetails }>()
);

export const signUpSuccess = createAction(`${userPrefix} Sign Up Success`);

export const signUpFailure = createAction(
  `${userPrefix} Sign Up Failure`,
  props<{ response: SignUpMessage }>()
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