import { createReducer, on } from '@ngrx/store';
import {
  setUserInfo,
  resetError,
  updateUserDetails,
  updateUserDetailsFailure,
  updateUserDetailsSuccess,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
  setToken,
  deleteUserOption,
  deleteUserOptionSuccess,
  deleteUserOptionFailure,
  addUserOptionToState,
  addUpdateUserOption,
  addUpdateUserOptionFailure,
  addUpdateUserOptionSuccess,
  clearAddUpdateUserOptionsState
} from '@shared/data-state/actions/user.action';

import { UserState } from '@shared/data-state/states/user.state';
import { UserOptionState } from '@shared/data-state/states/user/user-option.state';

export const initialUser: UserState = {
  userToken: null,
  userInfo: null,
  error: null,
  isUserUpdated: null,
  isUserDeleted: null,
  userOptionState: null
};

export const userReducer = createReducer(
  initialUser,
  on(setToken, (state, action): UserState => {
    return {
      ...state,
      userToken: action.token
    };
  }),
  on(resetError, (state, _): UserState => {
    return {
      ...state,
      error: null
    };
  }),
  on(setUserInfo, (state, action): UserState => {
    return {
      ...state,
      userInfo: action.user
    };
  }),
  on(updateUserDetails, (state, _): UserState => {
    return {
      ...state,
      isUserUpdated: null
    };
  }),
  on(updateUserDetailsSuccess, (state, action): UserState => {
    return {
      ...state,
      userInfo: action.user,
      isUserUpdated: true
    };
  }),
  on(updateUserDetailsFailure, (state, action): UserState => {
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
  on(addUserOptionToState, (state, action): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    let userOptions = clone.userOptionState;

    if (userOptions === null) {
      userOptions = {};
      userOptions[action.action] = {
        options: [action.userOptionId],
        isProcessing: false
      };
    } else {
      userOptions[action.action].options = [action.userOptionId];
    }

    return {
      ...state,
      userOptionState: userOptions
    };
  }),
  on(deleteUserOption, (state, _): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    const userOptions = clone.userOptionState ?? {};

    if (userOptions !== null) {
      userOptions['delete'].isComplete = false;
      userOptions['delete'].isProcessing = true;
      clone.userOptionState = userOptions;

      return clone;
    }

    return clone;
  }),
  on(deleteUserOptionSuccess, (state): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    const userOptions = clone.userOptionState;

    userOptions['delete'].isComplete = true;
    userOptions['delete'].isProcessing = false;
    clone.userOptionState = userOptions;

    return clone;
  }),
  on(deleteUserOptionFailure, (state, action): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    const userOptions = clone.userOptionState;

    const errorDetails = {
      message:
        "Couldn't delete your reccuring transaction. Please try again later.",
      statusCode: action.error.status
    };

    userOptions['delete'].isComplete = true;
    userOptions['delete'].isProcessing = false;
    userOptions['delete'].error = errorDetails;
    clone.userOptionState = userOptions;

    return clone;
  }),
  on(deleteUserAccountSuccess, (state): UserState => {
    return {
      ...state,
      isUserDeleted: true
    };
  }),
  on(deleteUserAccountFailure, (state, action): UserState => {
    const errorDetails = {
      message: action.error.message,
      statusCode: action.error.status
    };
    return {
      ...state,
      error: errorDetails,
      isUserDeleted: null
    };
  }),
  on(addUpdateUserOption, (state, action): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    const userOptions = clone.userOptionState ?? {};

    if (Object.keys(userOptions).length > 0) {
      userOptions[action.action].isComplete = false;
      userOptions[action.action].isProcessing = true;
      clone.userOptionState = userOptions;

      return clone;
    }

    userOptions[action.action] = {} as UserOptionState;
    userOptions[action.action].isComplete = false;
    userOptions[action.action].isProcessing = true;
    clone.userOptionState = userOptions;

    return clone;
  }),
  on(addUpdateUserOptionSuccess, (state, _): UserState => {
    const clone = JSON.parse(JSON.stringify(state));
    const userOptions = clone.userOptionState;

    userOptions['add'].isComplete = true;
    userOptions['add'].isProcessing = false;
    userOptions['add'].error = null;
    clone.userOptionState = userOptions;

    return clone;
  }),
  on(addUpdateUserOptionFailure, (state, action): UserState => {
    const clone = JSON.parse(JSON.stringify(state)) as UserState;

    const userOptions = clone.userOptionState as UserOptionState;
    const error = {
      message: action.error.message,
      statusCode: action.error.status
    };

    userOptions[action.action].error = error;
    userOptions[action.action].isComplete = true;
    userOptions[action.action].isProcessing = false;

    clone.userOptionState = userOptions;
    return clone;
  }),
  on(clearAddUpdateUserOptionsState, (state): UserState => {
    const clone = JSON.parse(JSON.stringify(state)) as UserState;
    clone.userOptionState = null;
    return clone;
  })
);
