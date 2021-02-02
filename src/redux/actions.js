import { nanoid } from "nanoid";
import Fire from "../config/firebase";

export const ADD_BLOG = "ADD_BLOG";
export const UPDATE_BLOG = "UPDATE_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";

export const addBlog = (title, description, image) => async (dispatch) => {
  try {
    let blog = { title, description, image };
    await Fire.addItem(blog, "lit-blog");

    dispatch({
      type: ADD_BLOG,
      blog: {
        id: nanoid(),
        title,
        image,
        description,
      },
    });
  } catch {}
};

// export const addBlog = (title, image, description) => {
//   return {
//     type: ADD_BLOG,
//     blog: {
//       id: nanoid(),
//       title,
//       image,
//       description,
//     },
//   };
// };

export const deleteBlog = (id) => {
  return {
    type: DELETE_BLOG,
    id,
  };
};

export const updateBlog = (id, title, description, image) => async (
  dispatch
) => {
  try {
    let blog = { title, description, image };
    let updatedBlog = await Fire.updateItem(id, blog, "lit-blog");
    dispatch({
      type: UPDATE_BLOG,
      id,
      blog: {
        id,
        title,
        description,
        image,
      },
    });
  } catch {}
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete,
  };
};

export const updateFilter = (filter) => {
  return {
    type: UPDATE_FILTER,
    filter,
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};
