import express from 'express';

import apiRouters from './api.js';
import initializeWebSocketServer from './websocket.js';

const app = express();


app.use('/', express.static('./public'));

app.use('/api', apiRouters);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(process.env.PORT || 3000);

initializeWebSocketServer();
