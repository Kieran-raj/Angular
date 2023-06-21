import { createReducer, on } from '@ngrx/store';
import {
  userLogin,
  userLoginSuccess,
  setUserInfo,
  userLogOut,
  userLoginFailure,
  resetError,
  setCheckMessage,
  signUpSuccess,
  signUpFailure,
} from '../actions/user.action';
import { UserState } from '../states/user.state';

export const initialUser: UserState = {
  userToken: null,
  userInfo: null,
  isLoggingIn: null,
  error: null,
  details: null,
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
  on(userLoginFailure, (state, action) => {
    return {
      ...state,
      userInfo: null,
      userToken: null,
      isLoggingIn: false,
      error: {
        message: action.message,
        statusCode: action.statusCode,
      },
    };
  }),
  on(resetError, (state, _) => {
    return {
      ...state,
      error: null,
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
  }),
  on(signUpSuccess, (state, _) => {
    return {
      ...state,
      details: {
        message: '',
        statusCode: 201,
      },
    };
  }),
  on(signUpFailure, (state, action) => {
    return {
      ...state,
      error: {
        message: action.response.message,
        statusCode: action.response.statusCode,
      },
    };
  }),
  on(setCheckMessage, (state, action) => {
    return {
      ...state,
      details: action.response,
    };
  })
);
