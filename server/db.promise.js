import { MongoClient } from 'mongodb';

const mongodbUrl = 'mongodb://localhost:27017/rock-scissors-paper';
const dbCollectionName = 'users';

function newUser() {
  return Date.now().toString();
}

function newRoom() {
  return Date.now().toString();
}

function connect() {
  return MongoClient.connect(mongodbUrl);
}

function getCollection(collectionName) {
  return db => Promise.all([
    db,
    db.collection(collectionName)
  ]);
}

function disConnect() {
  return ([db, collection, resultData]) => {
    db.close();

    return Promise.all([
      db,
      collection,
      resultData
    ]);
  };
}

function find(data = {}) {
  return ([db, collection]) => Promise.all([
    db,
    collection,
    collection.find(data).toArray()
  ]);
}

function list() {
  return find({});
}

function insert(data = {}) {
  return ([db, collection]) => Promise.all([
    db,
    collection,
    collection.insertOne(data)
  ]);
}

function deleteData(data = {}) {
  return ([db, collection]) => Promise.all([
    db,
    collection,
    collection.deleteOne(data)
  ]);
}

function update(dataToFind, newData) {
  return ([db, collection]) => Promise.all([
    db,
    collection,
    collection.updateOne(dataToFind, { $set: newData })
  ]);
}

function drop() {
  return ([db, collection]) => Promise.all([
    db,
    collection,
    collection.drop()
  ]);
}

function result(callback) {
  return ([db, collection, resultData]) => {
    if (callback) {
      callback(resultData);
    }

    return Promise.all([
      db,
      collection,
      resultData
    ]);
  };
}

function insertData(data, callback) {
  connect()
    .then(getCollection(dbCollectionName))
    .then(insert({ test: 1 }))
    .then((disConnect()))
    .then(result((resultData) => {
      callback(null, resultData);
    }))
    .catch((err) => {
      callback(err);
    });
}

function listData(callback) {
  connect()
    .then(getCollection(dbCollectionName))
    .then(list())
    .then((disConnect()))
    .then(result((resultData) => {
      callback(null, resultData);
    }))
    .catch((err) => {
      callback(err);
    });
}

function createRoom(data, callback) {
  const user = data.user || newUser();
  const room = newRoom();
  const newData = {
    room,
    users: [
      user
    ]
  };

  connect()
    .then(getCollection(dbCollectionName))
    .then(insert(newData))
    .then((disConnect()))
    .then(result((resultData) => {
      Object.assign(
        newData,
        {
          currentUser: user
        });
      callback(null, newData);
    }))
    .catch((err) => {
      callback(err);
    });
}

function joinRoom(data, callback) {
  if (!data.room) {
    callback(new Error('no room parameter'));
  }

  const room = data.room;
  const roomData = {
    room
  };

  let users;
  let findData;
  let currentUser;

  connect()
    .then(getCollection(dbCollectionName))
    .then(find(roomData))
    .then(result(resultData => {
      findData = resultData[0];
      users = findData.users || [];
      currentUser = data.user || newUser();
      users.push(currentUser);
    }))
    .then(update(roomData, { users }))
    .then((disConnect()))
    .then(result((resultData) => {
      console.log('db: update data result for join room:');
      console.log(resultData.result);
      const { ok, nModified } = resultData.result;
      if (ok && nModified) {
        Object.assign(
          findData,
          {
            currentUser
          });
        callback(null, findData);
      } else {
        callback(new Error('Update room db failed!'));
      }
    }))
    .catch((err) => {
      callback(err);
    });
}

export {
  insertData,
  listData,
  createRoom,
  joinRoom,
};
