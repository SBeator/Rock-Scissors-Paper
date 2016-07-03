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
  console.log('Data to be insert is:');
  console.dir(data);

  const existData = [];

  cursor.each((error, doc) => {
    if (doc != null) {
      console.dir(doc);
      existData.push(doc);
    } else {
      console.log(`Exist data length is: ${existData.length}`);

      if (!existData.length) {
        collection.insertOne(data, (err, result) => {
          console.log('Inserted data into the collection.');
          callback(err);
        });
      }
    }
  });
}

function find(db, dataToFind, callback) {
  const cursor = db.collection(dbCollectionName).find(dataToFind);
  console.log('dataToFind', dataToFind);

  const data = [];

  cursor.each((err, doc) => {
    if (doc != null) {
      console.log('Found data:');
      console.dir(doc);
      data.push(doc);
    } else {
      console.log('Find cursor err:', err);

      callback(err, data);
    }
  });
}

function list(db, callback) {
  find(db, {}, callback);
}

function update(db, dataToFind, newData, callback) {
  const collection = db.collection(dbCollectionName);
  console.log('update: dataToFind:', dataToFind);
  console.log('newData:', newData);
  console.log('$set:', { $set: newData });

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
      dbCallback(inserError, newData);
    });
  });
}

function joinRoom(data, callback) {
  connectData((err, db) => {
    const dbCallback = closeDbInCallback(db, callback);

    if (err) {
      dbCallback(err);
      return;
    }

    // TODO: Don't need find if room doesn't exist
    const room = data.room || newRoom();
    const roomData = {
      room
    };

    find(db, roomData, (findError, existData) => {
      console.log('find result:', existData);
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
            dbCallback(updateError, findData);
          }
        });
      }
    });
  });
}

export { insertData, listData, createRoom, joinRoom };
