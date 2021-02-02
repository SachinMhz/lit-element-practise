import {
  ADDING_BLOG,
  ADD_BLOG_FAIL,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  FETCHING_BLOG,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_SUCCESS,
  UPDATE_BLOG_SUCCESS,
} from "./actions.js";

const INITIAL_STATE = {
  blogs: [],
  fetchLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_BLOG:
      return {
        ...state,
        fetchLoading: true,
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        blogs: action.blogs,
      };
    case FETCH_BLOG_FAIL:
      return {
        ...state,
        fetchLoading: false,
      };
    case ADDING_BLOG:
      return {
        ...state,
        addLoading: true,
      };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        addLoading: false,
      };
    case ADD_BLOG_FAIL:
      return {
        ...state,
        addLoading: false,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.id),
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.map((blog) => {
          if (blog.id == action.id) return action.blog;
          return blog;
        }),
      };
    default:
      return state;
  }
};
