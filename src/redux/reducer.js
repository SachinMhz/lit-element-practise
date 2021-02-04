import { combineReducers } from "redux";

import blogReducer from "./blog-reducer";
import loginReducer from "./login-reducer";

const reducer = combineReducers({
  blog: blogReducer,
  login: loginReducer,
});

export default reducer;
