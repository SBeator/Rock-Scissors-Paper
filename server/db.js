import { MongoClient } from 'mongodb';

const mongodbUrl = 'mongodb://localhost:27017/rock-scissors-paper';
const dbCollectionName = 'users';

function newUser() {
  return Date.now().toString();
}

function newRoom() {
  return Date.now().toString();
}

function insert(db, data, callback) {
  const collection = db.collection(dbCollectionName);
  const cursor = collection.find(data);
  console.log('db:insert: Data to be insert is:');
  console.dir(data);

  const existData = [];

  cursor.each((error, doc) => {
    if (doc != null) {
      existData.push(doc);
    } else {
      console.log(`db:insert: Exist data length is: ${existData.length}`);

      if (!existData.length) {
        collection.insertOne(data, (err, result) => {
          console.log('db:insert: Inserted data into the collection.');
          callback(err);
        });
      }
    }
  });
}

function find(db, dataToFind, callback) {
  const cursor = db.collection(dbCollectionName).find(dataToFind);
  console.log('db:find: dataToFind', dataToFind);

  const data = [];

  cursor.each((err, doc) => {
    if (doc != null) {
      console.log('db:find: Found data:');
      console.dir(doc);
      data.push(doc);
    } else {
      console.log('db:find: Find cursor err:', err);

      callback(err, data);
    }
  });
}

function list(db, callback) {
  find(db, {}, callback);
}

function update(db, dataToFind, newData, callback) {
  const collection = db.collection(dbCollectionName);
  console.log('db:update: dataToFind:', dataToFind);
  console.log('db:update: newData:', newData);
  console.log('db:update: $set:', { $set: newData });

  collection.updateOne(
    dataToFind,
    { $set: newData },
    callback
  );
}

function connectData(callback) {
  MongoClient.connect(mongodbUrl, (err, db) => {
    if (!err) {
      callback(null, db);
    } else {
      callback(err);
    }
  });
}

function closeDbInCallback(db, callback) {
  return (...args) => {
    db.close();
    callback(...args);
  };
}

function insertData(data, callback) {
  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (!err) {
      insert(db, data, dbCallback);
    } else {
      dbCallback(err);
    }
  });
}

function listData(callback) {
  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (!err) {
      list(db, dbCallback);
    } else {
      dbCallback(err);
    }
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
