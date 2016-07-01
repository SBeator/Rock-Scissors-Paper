import express from 'express';

import { insertData, listData, createroom } from './db.js';

const router = express.Router();

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
  const query = req.query;

  const user = query.user;
  const room = query.room;

  const searchData = {};

  if (user) {
    searchData.user = user;
  }

  if (room) {
    searchData.room = room;
  }

  console.log(searchData);
  createroom(searchData, (err, data) => {
    console.log('searchData', data);
    console.log('err', err);
    if (err) {
      next(err);
    } else {
      console.log('send', data);
      res.send(data);
    }
  });
});

export default router;
