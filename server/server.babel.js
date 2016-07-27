import express from 'express';
import path from 'path';

import index from './index.js';
import apiRouters from './api.js';
import initializeWebSocketServer from './websocket.js';

const port = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/api', apiRouters);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log('500, err:');
  console.dir(err);
  res.send({ err: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening ${port}`);
});

initializeWebSocketServer();
