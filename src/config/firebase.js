import firebase from "firebase";

/**
 * Retrive data from given path
 *
 * @param {String} path - The path from where to retrive.
 * @return {*} - data from firebase.
 */
const _get = async (path) => {
  console.log("retriving from db...");
  try {
    let DataRef = firebase.database().ref(path);
    let data = await (await DataRef.once("value")).val();

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * store new data to given path
 *
 * @param {String} path - The path to store data.
 * @param {*} data - The data to be stored.
 */
const _post = async (path, data) => {
  console.log("adding to db...");
  let ItemsRef = firebase.database().ref(path);
  let newItemRef = ItemsRef.push();
  let id = newItemRef.key;
  await newItemRef.set({
    id,
    ...data,
  });
};

/**
 * update data from given path with id
 *
 * @param {String} path - The path update data.
 * @param {*} data - The data with id that are to be updated.
 */
const _put = async (path, data) => {
  console.log("updating to db...");
  let dataPath = path + "/" + data.id;
  var itemRef = firebase.database().ref(dataPath);
  await itemRef.update(data);
};

/**
 * delete data from given path with id
 *
 * @param {String} path - The path to delete data.
 * @param {*} data - The data with id that is to be deleted.
 */
const _delete = async (path, data) => {
  console.log("deleting form db...");
  let dataPath = path + "/" + data.id;
  await firebase.database().ref(dataPath).remove();
};

/**
 * create new user account in firebase
 *
 * @param {Object} credentials - Credentials of the user
 * @param {string} credentials.email - Email of the user
 * @param {string} credentials.password - Password of the user
 * @returns - Information about the user.
 */
const _signin = async (credentials) => {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);

    return data.user;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * login user to the app
 *
 * @param {Object} credentials - Credentials of the user
 * @param {string} credentials.email - Email of the user
 * @param {string} credentials.password - Password of the user
 * @returns - Information about the user.
 */
const _login = async (credentials) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);

    return data.user;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * logs user out of the app
 */
const _signout = async () => {
  try {
    await firebase.auth().signOut();

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * store new data with image to given path
 *
 * @param {String} path - The path to store data.
 * @param {Object} data - The data to be stored.
 * @param {File} imageBlob - Image to be stored in firebase storage
 */
const _post_withImage = async (path, blog, imageBlob) => {
  try {
    const trimTitle = blog.title.slice(0, 10);
    const ref = firebase
      .storage()
      .ref("Blog-images")
      .child(trimTitle + "_" + new Date().getTime() + "");

    const task = ref.put(imageBlob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log("error", error);
        return error;
      },
      (result) => {
        task.snapshot.ref.getDownloadURL().then(function (imageURL) {
          blog.image = imageURL;
          _post(path, blog);
        });
        return result;
      }
    );
  } catch (e) {
    console.log(e);
  }
};

/**
 * update data with image to given path
 * 
 * @param {String} path - The path update data.
 * @param {Object} data - The data with id that are to be updated.
 * @param {File} imageBlob - Image to be stored in firebase storage
 */
const _put_withImage = async (path, blog, imageBlob) => {
  try {
    const trimTitle = blog.title.slice(0, 10);
    const ref = firebase
      .storage()
      .ref("Blog-images")
      .child(trimTitle + "_" + new Date().getTime() + "");

    const task = ref.put(imageBlob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => {
        console.log("error", error);
        return error;
      },
      (result) => {
        task.snapshot.ref.getDownloadURL().then(function (imageURL) {
          blog.image = imageURL;
          _put(path, blog);
        });
        return result;
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const Fire = {
  _get,
  _post,
  _put,
  _delete,
  _login,
  _signin,
  _signout,
  _put_withImage,
  _post_withImage,
};

export default Fire;
