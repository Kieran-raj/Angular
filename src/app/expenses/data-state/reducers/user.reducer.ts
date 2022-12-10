import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  userLogin,
  userLoginSuccess,
  setUserInfo,
  userLogOut,
} from '../actions/user.action';
import { UserState } from '../states/user.state';

export const initialUser: UserState = {
  userToken: null,
  userInfo: null,
  isLoggingIn: null,
};

export const userReducer = createReducer(
  initialUser,
  on(userLogin, (state, action) => {
    return {
      ...state,
      isLoggingIn: action.isloggingIn,
    };
  }),
  on(userLoginSuccess, (state, action) => {
    return {
      ...state,
      userToken: action.authToken,
      isLoggingIn: false,
    };
  }),
  on(setUserInfo, (state, action) => {
    return {
      ...state,
      userInfo: action.user,
    };
  }),
  on(userLogOut, (state) => {
    return {
      ...state,
      userInfo: null,
      userToken: null,
    };
  })
);
