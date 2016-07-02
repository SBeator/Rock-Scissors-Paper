import express from 'express';

import { insertData, listData, createRoom, joinRoom } from './db.js';

const router = express.Router();

function getUserAndRoomData(req) {
  const query = req.query;

  const user = query.user;
  const room = query.room;

  const userRoomData = {};

  if (user) {
    userRoomData.user = user;
  }

  if (room) {
    userRoomData.room = room;
  }

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
  const userRoomData = getUserAndRoomData(req);

  createRoom(userRoomData, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/joinroom', (req, res, next) => {
  const userRoomData = getUserAndRoomData(req);

  if (!userRoomData.room) {
    res.send({});
    return;
  }

  joinRoom(userRoomData, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

export default router;
