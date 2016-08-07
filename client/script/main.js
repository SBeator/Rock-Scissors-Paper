import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../../redux/reducers';
import actions from '../../redux/actions';

import GameContainer from './container/GameContainer';

// import GameWebSocket from './ClientWebSocket.js';
// import GameConnect from './GameConnect.js';

const initialState = window.globalInitialState;

// render(
//   <Game hostname={location.hostname} pageOrigin={location.origin} {...initialState} />,
//   document.getElementById('root')
// );

let store = createStore(reducer, initialState);

store.dispatch(actions.clientSideInit(location.hostname, location.origin));

render(
  (<Provider store={store}>
    <GameContainer />
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

