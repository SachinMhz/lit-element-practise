import { ADD_BLOG, DELETE_BLOG, UPDATE_BLOG } from "./actions.js";

const INITIAL_STATE = {
  blogs: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.blog],
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.id),
      };
    case UPDATE_BLOG:
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
