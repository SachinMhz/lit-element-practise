import firebase from "firebase";

const retriveItems = (path) => {
  return new Promise(function (resolve, reject) {
    console.log("retriving from db...");
    let DataRef = firebase.database().ref(path);
    DataRef.on("value", (snapshot) => {
      let data_object = snapshot.val(); //object of objects
      let data_array = Object.values(data_object); //array of objects
      resolve(data_array);
      if (data_array === null) {
        reject("Something wrong with database");
      }
    });
  });
};

const addItem = async (data, path) => {
  console.log("adding to db...");
  let ItemsRef = firebase.database().ref(path);
  let newItemRef = ItemsRef.push();
  let id = newItemRef.key;
  await newItemRef.set({
    id,
    ...data,
  });
};

const updateItem = async (id, data, path) => {
  console.log("updating to db...");
  let dataPath = path + "/" + id;
  var itemRef = firebase.database().ref(dataPath);
  await itemRef.update(data);
};

const deleteItem = async (id, path) => {
  console.log("deleting form db...");
  let dataPath = path + "/" + id;
  await firebase.database().ref(dataPath).remove();
};

const Fire = {
  addItem,
  retriveItems,
  updateItem,
  deleteItem,
};

export default Fire;
