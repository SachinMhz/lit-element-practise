import {
  ADDING_BLOG,
  ADD_BLOG_FAIL,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  FETCHING_BLOG,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_SUCCESS,
  FETCHING_BLOG_LIST,
  FETCH_BLOG_LIST_FAIL,
  FETCH_BLOG_LIST_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  UPDATING_BLOG,
} from "./blog-actions.js";

const INITIAL_STATE = {
  blogs: [],
  blog: {
    title: "",
    description: "",
    image: "",
    createDate: "",
    updateDate: "",
  },
  blogLoading: false,
  fetchLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_BLOG_LIST:
      return {
        ...state,
        fetchLoading: true,
      };
    case FETCH_BLOG_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        blogs: action.blogs,
      };
    case FETCH_BLOG_LIST_FAIL:
      return {
        ...state,
        fetchLoading: false,
      };

    case FETCHING_BLOG:
      return {
        ...state,
        blogLoading: true,
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        blogLoading: false,
        blog: action.blog,
      };
    case FETCH_BLOG_FAIL:
      return {
        ...state,
        blogLoading: false,
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
      };
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        updateLoading: false,
      };
    case UPDATING_BLOG:
      return {
        ...state,
        updateLoading: true,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
