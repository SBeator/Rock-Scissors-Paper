import express from 'express';

import { insertData, listData, createRoom, joinRoom } from './db.js';

const router = express.Router();

function getUserData(req) {
  const query = req.query;

  const user = query.user;

  return { user };
}

function getRoomData(req) {
  const query = req.query;

  const room = query.room;

  return { room };
}

function getUserAndRoomData(req) {
  const user = getUserData(req);
  const room = getRoomData(req);

  const userRoomData = {};

  Object.assign(userRoomData, user, room);

  return userRoomData;
}

router.get('/add', (req, res, next) => {
  const query = req.query;

  let user;
  if (query.user) {
    user = query.user;
  } else {
    user = Date.now().toString();
  }

  insertData({ user }, (err, data) => {
    if (err) {
      next(err);
    }
  });

  res.send(user);
});

router.get('/list', (req, res, next) => {
  listData((err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/createroom', (req, res, next) => {
  const userData = getUserData(req);

  createRoom(userData, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/joinroom', (req, res, next) => {
  const roomData = getRoomData(req);

  if (!roomData.room) {
    res.send({});
    console.log('empty room');
    return;
  }

  joinRoom(roomData, (err, data) => {
    if (err) {
      console.log('joinRoom error', err);
      next(err);
    } else {
      console.log('data', data);
      res.send(data);
    }
  });
});

export default router;
