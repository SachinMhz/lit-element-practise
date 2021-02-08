import firebase from "firebase";

const _get = async (path) => {
  console.log("retriving from db...");
  try {
    let DataRef = firebase.database().ref(path);
    let data = await (await DataRef.once("value")).val();

    return Object.values(data);
  } catch (error) {
    return error.errorMessage;
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

const _signin = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return data.user;
  } catch (error) {
    return error.errorMessage;
  }
};

const _login = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return data.user;
  } catch (error) {
    return error.errorMessage;
  }
};

const _signout = async () => {
  try {
    await firebase.auth().signOut();

    return true;
  } catch (error) {
    return error.errorMessage;
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
};

export default Fire;
