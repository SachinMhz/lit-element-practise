import {
  LOGGING_IN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./login-actions.js";

const INITIAL_STATE = {
  user: null,
  loginLoading: false,
  loginError: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        loginLoading: true,
        user: null,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: action.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
