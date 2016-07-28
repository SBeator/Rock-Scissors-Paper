import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../../redux/reducers';

import i18nCore from 'i18n-core';
import stringEn from '../../i18n/en.json';
import stringZh from '../../i18n/zh.json';

import Game from './components/Game.jsx';

// import GameWebSocket from './ClientWebSocket.js';
// import GameConnect from './GameConnect.js';

const i18n = i18nCore({
  en: stringEn,
  zh: stringZh
});

/* eslint-disable */
console.log(i18n.lang('zh').__('resultLose'));
console.log(i18n.lang('en').__('resultLose'));
/* eslint-enable */

const initialState = window.globalInitialState;

// render(
//   <Game hostname={location.hostname} pageOrigin={location.origin} {...initialState} />,
//   document.getElementById('root')
// );

let store = createStore(reducer);

render(
  (<Provider store={store}>
    <Game hostname={location.hostname} pageOrigin={location.origin} {...initialState} />
  </Provider>),
  document.getElementById('root')
);


// const gameWebSocket = new GameWebSocket();

// gameWebSocket.on('open', () => {
//   console.log('open!');

//   gameWebSocket.send('test');
// });

// const gameConnect = new GameConnect();

// if (roomToJoin) {
//   gameConnect.joinRoom(roomToJoin, 654321, (message) => {
//     console.log(message);
//   });
// } else {
//   gameConnect.createRoom(123456, (message) => {
//     console.log(message);
//   });
// }

