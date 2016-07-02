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
      console.dir(doc);
      data.push(doc);
    } else {
      console.log('cursor err', err);

      callback(err, data);
    }
  });
}

function list(db, callback) {
  find(db, {}, callback);
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

    console.log('createRoom', data);

    find(db, data, (findError, existData) => {
      console.log('existData', existData);
      if (findError || existData.length) {
        console.log('existData[0]', existData[0]);
        dbCallback(findError, existData[0]);
      } else {
        const user = data.user || newUser();
        const room = data.room || newRoom();

        const newData = { user, room };
        insert(db, newData, (inserError) => {
          dbCallback(inserError, newData);
        });
      }
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

    find(db, data, (findError, existData) => {
      if (findError || existData.length) {
        dbCallback(findError, existData[0]);
      } else {
        const user = data.user || newUser();
        const room = data.room || newRoom();

        const newData = { user, room };
        insert(db, newData, (inserError) => {
          dbCallback(inserError, newData);
        });
      }
    });
  });
}

export { insertData, listData, createRoom, joinRoom };
