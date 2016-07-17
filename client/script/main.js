import React from 'react';
import ReactDOM from 'react-dom';

import i18nCore from 'i18n-core';
import stringEn from '../../i18n/en.json';
import stringZh from '../../i18n/zh.json';

import Game from './components/Game.jsx';

// import GameWebSocket from './ClientWebSocket.js';
import GameConnect from './GameConnect.js';

const i18n = i18nCore({
  en: stringEn,
  zh: stringZh
});

/* eslint-disable */
console.log(i18n.lang('zh').__('resultLose'));
console.log(i18n.lang('en').__('resultLose'));
/* eslint-enable */


const match = location.search.match(/[\?&]joinroom=(\d*)/);

let roomToJoin;
if (match) {
  roomToJoin = match[1];
}

ReactDOM.render(
  <Game roomToJoin={roomToJoin} />,
  document.getElementById('root')
);

// const gameWebSocket = new GameWebSocket();

// gameWebSocket.on('open', () => {
//   console.log('open!');

//   gameWebSocket.send('test');
// });

const gameConnect = new GameConnect();

gameConnect.createRoom(123456);
