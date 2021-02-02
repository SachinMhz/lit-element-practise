import firebase from "firebase";

const _get = (path) => {
  return new Promise(function (resolve, reject) {
    console.log("retriving from db...");
    let DataRef = firebase.database().ref(path);
    DataRef.on("value", (snapshot) => {
      let data_object = snapshot.val(); //object of objects
      let data_array = Object.values(data_object); //array of objects
      if (!data_array) {
        reject("Something wrong with database");
      }
      resolve(data_array);
    });
  });
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

const Fire = {
  _get,
  _post,
  _put,
  _delete,
};

export default Fire;
