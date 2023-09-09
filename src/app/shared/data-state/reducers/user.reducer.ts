import { createReducer, on } from '@ngrx/store';
import {
  setUserInfo,
  resetError,
  updateUserDetails,
  updateUserDetailsFailure,
  updateUserDetailsSuccess,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
  setToken
} from '../actions/user.action';
import { UserState } from '../states/user.state';

export const initialUser: UserState = {
  userToken: null,
  userInfo: null,
  error: null,
  isUserUpdated: null,
  isUserDeleted: null
};

export const userReducer = createReducer(
  initialUser,
  on(setToken, (state, action) => {
    return {
      ...state,
      userToken: action.token
    };
  }),
  on(resetError, (state, _) => {
    return {
      ...state,
      error: null
    };
  }),
  on(setUserInfo, (state, action) => {
    return {
      ...state,
      userInfo: action.user
    };
  }),
  on(updateUserDetails, (state, _) => {
    return {
      ...state,
      isUserUpdated: null
    };
  }),
  on(updateUserDetailsSuccess, (state, action) => {
    return {
      ...state,
      userInfo: action.user,
      isUserUpdated: true
    };
  }),
  on(updateUserDetailsFailure, (state, action) => {
    const errorDetails = {
      message: action.error.message,
      statusCode: action.error.status
    };

    return {
      ...state,
      error: errorDetails,
      isUserUpdated: false
    };
  }),
  on(deleteUserAccountSuccess, (state) => {
    return {
      ...state,
      isUserDeleted: true
    };
  }),
  on(deleteUserAccountFailure, (state, action) => {
    const errorDetails = {
      message: action.error.message,
      statusCode: action.error.status
    };
    return {
      ...state,
      error: errorDetails,
      isUserDeleted: null
    };
  })
);
