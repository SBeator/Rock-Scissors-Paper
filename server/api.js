import express from 'express';
import qr from 'qr-image';
import qrConfig from '../config/qrcode.json';


import { insertData, listData, createRoom, joinRoom, findRoom, punch } from './db.js';

const router = express.Router();

function getUserData(req) {
  console.log(req);

  const query = req.query;
  console.log('b');

  const user = query.user;
  console.log('c');

  return { user };
}

function getRoomData(req) {
  const query = req.query;

  const room = query.room;

  return { room };
}

function getPunchData(req) {
  const query = req.query;

  return { punch: query.punch };
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
  const userAndRoomData = getUserAndRoomData(req);

  if (!userAndRoomData.room) {
    res.send({});
    console.log('empty room');
    return;
  }

  console.log('Api joinroom userAndRoomData:');
  console.log(userAndRoomData);
  joinRoom(userAndRoomData, (err, data) => {
    if (err) {
      console.log('joinRoom error', err);
      next(err);
    } else {
      console.log('data', data);
      res.send(data);
    }
  });
});

router.get('/getroomstatus', (req, res, next) => {
  const roomData = getRoomData(req);

  console.log('getroomstatus');

  if (!roomData.room) {
    console.log('Wrong query!!!!!!');
    res.send({});
    return;
  }
  console.log('3');

  const userData = getUserData(req);

  console.log('4');
  if (req.query.removePunch && userData.user) {
    console.log('1');

    Object.assign(
      roomData,
      userData,
      {
        removePunch: true
      });
    console.log('2');
  }

  console.log('roomData:', roomData);

  findRoom(roomData, (err, data) => {
    if (err) {
      next(err);
    } else {
      console.log('data', data);
      res.send(data);
    }
  });
});

router.get('/punch', (req, res, next) => {
  const punchData = getPunchData(req);

  Object.assign(punchData, getUserAndRoomData(req));

  // TODO error check

  punch(punchData, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send({ success: true });
    }
  });
});

router.get(qrConfig.path, (req, res) => {
  const query = req.query;

  const text = query[qrConfig.textPara];
  const size = parseInt(query[qrConfig.sizePara], 10) || 5;
  const margin = parseInt(query[qrConfig.marginPara], 10) || 4;

  const qrImage = qr.image(text, {
    size,
    margin
  });
  res.type('png');
  qrImage.pipe(res);
});


export default router;
