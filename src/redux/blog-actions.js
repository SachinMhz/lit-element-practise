import Fire from "../config/firebase";
import { ENDPOINTS } from "../constants/endpoints";

export const FETCHING_BLOG = "FETCHING_BLOG";
export const FETCH_BLOG_FAIL = "FETCH_BLOG_FAIL";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";

export const FETCHING_BLOG_LIST = "FETCHING_BLOG_LIST";
export const FETCH_BLOG_LIST_FAIL = "FETCH_BLOG_LIST_FAIL";
export const FETCH_BLOG_LIST_SUCCESS = "FETCH_BLOG_LIST_SUCCESS";

export const ADDING_BLOG = "ADDING_BLOG";
export const ADD_BLOG_FAIL = "ADD_BLOG_FAIL";
export const ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS";

export const UPDATING_BLOG = "UPDATING_BLOG";
export const UPDATE_BLOG_FAIL = "UPDATE_BLOG_FAIL";
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS";

export const DELETING_BLOG = "DELETING_BLOG";
export const DELETE_BLOG_FAIL = "DELETE_BLOG_FAIL";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";

/**
 * Retrive single blog from firebase
 *
 * @param {String} id - ID of the blog
 * @returns {Promise} Promise object represents boolean value
 */
export const fetchBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_BLOG });

    let response = await Fire._get(ENDPOINTS.BLOG_LIST + "/" + id);

    dispatch({ type: FETCH_BLOG_SUCCESS, blog: response });
    return Promise.resolve(true);
  } catch (error) {
    dispatch({ type: FETCH_BLOG_FAIL });
    console.log("fetch error", error);
    return Promise.resolve(false);
  }
};

/**
 * Retrive list of blogs from firebase
 * @returns {Promise} Promise object represents boolean value
 */
export const fetchBlogList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_BLOG_LIST });

    let response = await Fire._get(ENDPOINTS.BLOG_LIST);
    dispatch({ type: FETCH_BLOG_LIST_SUCCESS, blogs: Object.values(response) });
    return Promise.resolve(true);
  } catch (error) {
    dispatch({ type: FETCH_BLOG_LIST_FAIL });
    console.log("fetch error", error);
    return Promise.resolve(false);
  }
};

/**
 * Add blog to firebase
 *
 * @param {Object} blog - Blog
 * @param {string} blog.title - Title of the blog
 * @param {string} blog.desription - Description of the blog
 * @param {string} blog.createDate - Created Date of the blog
 * @param {File} [imageBlob] - Image file
 * @returns {Promise} Promise object represents boolean value
 */
export const addBlog = (blog, imageBlob) => async (dispatch) => {
  try {
    dispatch({ type: ADDING_BLOG });
    imageBlob
      ? await Fire._post_withImage(ENDPOINTS.BLOG_LIST, blog, imageBlob)
      : await Fire._post(ENDPOINTS.BLOG_LIST, blog);

    dispatch({ type: ADD_BLOG_SUCCESS });

    return Promise.resolve(true);
  } catch (error) {
    dispatch({ type: ADD_BLOG_FAIL });
    console.log("add error", error);
    return Promise.reject(false);
  }
};

/**
 * Delete the blog from firebase
 *
 * @param {Object} blog - Blog
 * @param {string} blog.id - Title of the blog
 * @returns {Promise} Promise object represents boolean value
 */
export const deleteBlog = (blog) => async (dispatch) => {
  try {
    dispatch({ type: DELETING_BLOG });

    await Fire._delete(ENDPOINTS.BLOG_LIST, blog);
    dispatch({ type: DELETE_BLOG_SUCCESS });
    return Promise.resolve(true);
  } catch (error) {
    dispatch({ type: DELETE_BLOG_FAIL });
    console.log("delete error", error);
    return Promise.resolve(false);
  }
};

/**
 * Update the blog from firebase
 *
 * @param {Object} blog - Blog
 * @param {string} blog.id - ID of the blog
 * @param {string} blog.title - Title of the blog
 * @param {string} blog.desription - Description of the blog
 * @param {string} blog.image - ImageUrl of image for the blog
 * @param {string} blog.createDate - Created Date of the blog
 * @param {string} blog.updateDate - Updated Date of the blog
 * @param {File} [imageBlob] - Image file
 * @returns {Promise} Promise object represents boolean value
 */
export const updateBlog = (blog, imageBlob) => async (dispatch) => {
  try {
    dispatch({ type: UPDATING_BLOG });

    imageBlob
      ? await Fire._put_withImage(ENDPOINTS.BLOG_LIST, blog, imageBlob)
      : await Fire._put(ENDPOINTS.BLOG_LIST, blog);

    dispatch({ type: UPDATE_BLOG_SUCCESS });
    return Promise.resolve(true);
  } catch (error) {
    dispatch({ type: UPDATE_BLOG_FAIL });
    console.log("update error", error);
    return Promise.resolve(false);
  }
};
