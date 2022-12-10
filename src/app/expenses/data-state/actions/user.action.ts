import { createAction, props } from '@ngrx/store';
import { AuthToken } from 'src/app/shared/models/auth-models/auth-token';
import { User } from 'src/app/shared/models/user';

const userPrefix = `[User] - `;

export const userLogin = createAction(
  `${userPrefix} Log in`,
  props<{ email: string; password: string; isloggingIn: boolean }>()
);

export const userLoginSuccess = createAction(
  `${userPrefix} Log in success`,
  props<{ authToken: AuthToken }>()
);

export const setUserInfo = createAction(
  `${userPrefix} Set User Info`,
  props<{ user: User }>()
);

export const userLogOut = createAction(`${userPrefix} Log out`);
