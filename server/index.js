import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Game from '../client/script/components/Game.jsx';


const router = express.Router();

router.get('/', (req, res, next) => {
  const { room } = req.query;

  const initialState = {
    room
  };

  const html = renderToString(<Game />);
  res.render('index', { html, initialState });
});

module.exports = router;
