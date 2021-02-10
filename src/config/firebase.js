import firebase from "firebase";

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

const _put = async (path, data) => {
  console.log("updating to db...");
  let dataPath = path + "/" + data.id;
  var itemRef = firebase.database().ref(dataPath);
  await itemRef.update(data);
};

const _delete = async (path, data) => {
  console.log("deleting form db...");
  let dataPath = path + "/" + data.id;
  await firebase.database().ref(dataPath).remove();
};

const _signin = async ({ email, password }) => {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return data.user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const _login = async ({ email, password }) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return data.user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const _signout = async () => {
  try {
    await firebase.auth().signOut();

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
