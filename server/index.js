import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../redux/reducers';
import actions from '../redux/actions';

import Game from '../client/script/components/Game.jsx';


const router = express.Router();

router.get('/', (req, res, next) => {
  const { room } = req.query;

  // const initialState = {
  //   room
  // };

  console.log(res.__('otherPunchFormat', { otherPunch: res.__('chooseRock') }));

  const store = createStore(reducer);

  if (room) {
    store.dispatch(actions.joiningRoom(room));
  }

  const initialState = store.getState();

  const html = renderToString(
    <Provider store={store}>
      <Game {...initialState} />
    </Provider>
  );

  res.render('index', { html, initialState });
});

module.exports = router;
