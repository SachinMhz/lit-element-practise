import Fire from "../config/firebase";

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGGING_IN });

    let user = await Fire._login(email, password);
    dispatch({ type: LOGIN_SUCCESS, user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error });
    console.log("login error", error);
  }
};

export const signin = (email, password, name) => async (dispatch) => {
  try {
    console.log("tryinh")
    dispatch({ type: LOGGING_IN });

    let user = await Fire._signin(email, password, name);
    dispatch({ type: LOGIN_SUCCESS, user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error });
    console.log("login error", error);
  }
};

export const logout = (email, password) => async (dispatch) => {
  try {
    let user = await Fire._signout();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error });
    console.log("login error", error);
  }
};
