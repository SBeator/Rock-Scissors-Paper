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
  console.log('db.promise: insert outer');

  return ([db, collection]) => {
    console.log('db.promise: insert inner');
    return Promise.all([
      db,
      collection,
      collection.insertOne(data)
    ]);
  };
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
  console.log('db.promise: result outer');

  return ([db, collection, resultData]) => {
    console.log('db.promise: result inner');
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

connect()
.then(getCollection(dbCollectionName))
.then(drop())
.then(insert({ test: 1 }))
.then(result((resultData) => {
  console.log('insert result:');
  console.log(resultData);
}))
.then(find({ test: 1 }))
.then(result((resultData) => {
  console.log('find result:');
  console.log(resultData);
}))
.then(deleteData({ test: 1 }))
.then(result((resultData) => {
  console.log('delete result:');
  console.log(resultData);
}))
.then(find())
.then((disConnect()))
.then(result((resultData) => {
  console.log('find result:');
  console.log(resultData);
}));

// function insert(db, data, callback) {
//   const collection = db.collection(dbCollectionName);
//   const cursor = collection.find(data);
//   console.log('db:insert: Data to be insert is:');
//   console.dir(data);

//   const existData = [];

//   cursor.each((error, doc) => {
//     if (doc != null) {
//       existData.push(doc);
//     } else {
//       console.log(`db:insert: Exist data length is: ${existData.length}`);

//       if (!existData.length) {
//         collection.insertOne(data, (err, result) => {
//           console.log('db:insert: Inserted data into the collection.');
//           callback(err);
//         });
//       }
//     }
//   });
// }

// function find(db, dataToFind, callback) {
//   const cursor = db.collection(dbCollectionName).find(dataToFind);
//   console.log('db:find: dataToFind', dataToFind);

//   const data = [];

//   cursor.each((err, doc) => {
//     if (doc != null) {
//       console.log('db:find: Found data:');
//       console.dir(doc);
//       data.push(doc);
//     } else {
//       console.log('db:find: Find cursor err:', err);

//       callback(err, data);
//     }
//   });
// }

// function list(db, callback) {
//   find(db, {}, callback);
// }

// function update(db, dataToFind, newData, callback) {
//   const collection = db.collection(dbCollectionName);
//   console.log('db:update: dataToFind:', dataToFind);
//   console.log('db:update: newData:', newData);
//   console.log('db:update: $set:', { $set: newData });

//   collection.updateOne(
//     dataToFind,
//     { $set: newData },
//     callback
//   );
// }

// function connectData(callback) {
//   MongoClient.connect(mongodbUrl, (err, db) => {
//     if (!err) {
//       callback(null, db);
//     } else {
//       callback(err);
//     }
//   });
// }

function closeDbInCallback(db, callback) {
  return (...args) => {
    db.close();
    callback(...args);
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
  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (err) {
      dbCallback(err);
      return;
    }

    const user = data.user || newUser();
    const room = newRoom();
    const newData = {
      room,
      users: [
        user
      ]
    };
    insert(db, newData, (inserError) => {
      Object.assign(
        newData,
        {
          user
        });

      dbCallback(inserError, newData);
    });
  });
}

function joinRoom(data, callback) {
  if (!data.room) {
    callback(new Error('no room parameter'));
  }

  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (err) {
      dbCallback(err);
      return;
    }

    const room = data.room;
    const roomData = {
      room
    };

    find(db, roomData, (findError, existData) => {
      console.log('db:joinRoom: find result:', existData);
      if (findError) {
        dbCallback(findError);
      } else if (!existData.length) {
        dbCallback(new Error('Room doesn\'t not exist'));
      } else {
        const findData = existData[0];
        const users = findData.users || [];
        users.push(data.user || newUser());

        update(db, roomData, { users }, (updateError, result) => {
          if (updateError) {
            dbCallback(updateError);
          } else {
            Object.assign(
              findData,
              {
                user: data.user
              });

            dbCallback(updateError, findData);
          }
        });
      }
    });
  });
}

function findRoom(data, callback) {
  if (!data.room) {
    callback(new Error('no room parameter'));
  }

  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (err) {
      dbCallback(err);
      return;
    }

    const room = data.room;
    const roomData = {
      room
    };

    find(db, roomData, (findError, existData) => {
      console.log('db:findRoom: find result:', existData);
      if (findError) {
        dbCallback(findError);
      } else if (!existData.length) {
        dbCallback(new Error('Room doesn\'t not exist'));
      } else {
        const findData = existData[0];

        if (!data.removePunch || !data.user) {
          dbCallback(null, findData);
        } else {
          const removePunch = !findData.removePunch;
          const punches = removePunch ? findData.punches : {};

          update(db, roomData, { removePunch, punches }, (updateError, result) => {
            console.log('db:findRoom: punch update error:', updateError);
            console.log('db:findRoom: punch update result:', result);
            if (updateError) {
              dbCallback(updateError);
            } else {
              dbCallback(updateError, findData);
            }
          });
        }
      }
    });
  });
}

function punch(data, callback) {
  // TODO: do more error check
  if (!data.room) {
    callback(new Error('no room parameter'));
  }

  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (err) {
      dbCallback(err);
      return;
    }

    const room = data.room;
    const roomData = {
      room
    };

    find(db, roomData, (findError, existData) => {
      console.log('db:punch: find result:', existData);
      if (findError) {
        dbCallback(findError);
      } else if (!existData.length) {
        dbCallback(new Error('Room doesn\'t not exist'));
      } else {
        const findData = existData[0];
        const punches = findData.punches || {};

        punches[data.user] = data.punch;

        update(db, roomData, { punches }, (updateError, result) => {
          console.log('db:punch: punch update error:', updateError);
          console.log('db:punch: punch update result:', result);
          if (updateError) {
            dbCallback(updateError);
          } else {
            dbCallback(updateError, findData);
          }
        });
      }
    });
  });
}

export {
insertData,
listData,
createRoom,
joinRoom,
findRoom,
punch
};
