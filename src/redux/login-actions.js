import Fire from "../config/firebase";

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

/**
 * login user to the app
 *
 * @param {Object} credentials - Credentials of the user
 * @param {string} credentials.email - Email of the user
 * @param {string} credentials.password - Password of the user
 * @returns - Information about the user.
 */
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGGING_IN });

    let user = await Fire._login(credentials);
    dispatch({ type: LOGIN_SUCCESS, user });

    return Promise.resolve(user);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error: error.message });
    return Promise.reject(error);
  }
};

/**
 * create new user account in firebase
 *
 * @param {Object} credentials - Credentials of the user
 * @param {string} credentials.email - Email of the user
 * @param {string} credentials.password - Password of the user
 * @returns - Information about the user.
 */
export const signin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGGING_IN });

    let user = await Fire._signin(credentials);
    dispatch({ type: LOGIN_SUCCESS, user });

    return Promise.resolve(user);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error: error.message });
    return Promise.reject(error);
  }
};

/**
 * logs user out of the app
 */
export const logout = () => async (dispatch) => {
  try {
    await Fire._signout();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, error: error.message });
  }
};
