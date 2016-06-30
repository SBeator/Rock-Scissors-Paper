import express from 'express';

import { insertData, listData } from './db.js';

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
      next();
    }
  });

  res.send(user);
});

router.get('/list', (req, res, next) => {
  listData((err, data) => {
    if (err) {
      next();
    } else {
      res.send(data);
    }
  });
});

export default router;
