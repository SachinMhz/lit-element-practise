import Fire from "../config/firebase";
import { ENDPOINTS } from "../constants/endpoints";

export const FETCHING_BLOG = "FETCHING_BLOG";
export const FETCH_BLOG_FAIL = "FETCH_BLOG_FAIL";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";

export const ADDING_BLOG = "ADDING_BLOG";
export const ADD_BLOG_FAIL = "ADD_BLOG_FAIL";
export const ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS";

export const UPDATING_BLOG = "UPDATING_BLOG";
export const UPDATE_BLOG_FAIL = "UPDATE_BLOG_FAIL";
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS";

export const DELETING_BLOG = "DELETING_BLOG";
export const DELETE_BLOG_FAIL = "DELETE_BLOG_FAIL";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";

export const fetchBlog = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_BLOG });

    let blogs = await Fire._get(ENDPOINTS.BLOG_LIST);
    dispatch({ type: FETCH_BLOG_SUCCESS, blogs });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_FAIL });
    console.log("fetch error", error);
  }
};

export const addBlog = (blog) => async (dispatch) => {
  try {
    dispatch({ type: ADDING_BLOG });

    await Fire._post(ENDPOINTS.BLOG_LIST, blog);
    dispatch({ type: ADD_BLOG_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_BLOG_FAIL });
    console.log("add error", error);
  }
};

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    dispatch({ type: DELETING_BLOG });

    await Fire._delete(ENDPOINTS.BLOG_LIST, blog);
    dispatch({ type: DELETE_BLOG_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_BLOG_FAIL });
    console.log("delete error", error);
  }
};

export const updateBlog = (blog) => async (dispatch) => {
  try {
    dispatch({ type: UPDATING_BLOG });

    await Fire._put(ENDPOINTS.BLOG_LIST, blog);
    dispatch({ type: UPDATE_BLOG_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_BLOG_FAIL });
    console.log("update error", error);
  }
};
