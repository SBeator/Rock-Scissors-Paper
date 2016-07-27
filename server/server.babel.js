import express from 'express';
import path from 'path';

import apiRouters from './api.js';
import initializeWebSocketServer from './websocket.js';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouters);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log('500, err:');
  console.dir(err);
  res.send({ err: err.message });
});

app.listen(process.env.PORT || 3000);

initializeWebSocketServer();
