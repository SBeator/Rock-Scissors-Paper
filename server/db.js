import { MongoClient } from 'mongodb';

const mongodbUrl = 'mongodb://localhost:27017/rock-scissors-paper';
const dbCollectionName = 'users';

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
          db.close();
        });
      }
    }
  });
}

function list(db, callback) {
  const cursor = db.collection(dbCollectionName).find();

  const data = [];

  cursor.each((err, doc) => {
    if (doc != null) {
      console.dir(doc);
      data.push(doc);
    } else {
      callback(err, data);
      db.close();
    }
  });
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

function insertData(data, callback) {
  connectData((err, db) => {
    if (!err) {
      insert(db, data, callback);
    } else {
      callback(err);
    }
  });
}

function listData(callback) {
  connectData((err, db) => {
    if (!err) {
      list(db, callback);
    } else {
      callback(err);
    }
  });
}

export { insertData, listData };
