import types from '../actions/types';

const gameActionTypes = {
  [types.IDLE]: {
    messages: []
  },
  [types.CREATING_ROOM]: {
    messages: ['Creating room...']
  },
  [types.WAITING_IN_ROOM]: {
    messages: ['Waiting other player join']
  },
  [types.JOINING_ROOM]: {
    messages: ['Joining room']
  },
  [types.OTHER_PLAYER_JOINED]: {
    messages: ['Please punch']
  },
  [types.READYING]: {
    messages: []
  },
  [types.READY]: {
    messages: []
  },
  [types.OTHER_PLAYER_READY]: {
    messages: []
  },
  [types.PUNCHING]: {
    messages: ['Punching']
  },
  [types.PUNCHED]: {
    messages: ['Waiting other player punch']
  },
  [types.OTHER_PLAYER_PUNCHE]: {
    messages: ['Other player is punched']
  }
};

const gameReducers = (state = { type: types.IDLE }, action) => {
  let newState;

  const gameActionObject = gameActionTypes[action.type];

  if (gameActionObject) {
    const {
      type,
      room,
      user,
      otherUser,
      punch,
      otherPunch } = action;

    const { messages } = gameActionObject;

    newState = Object.assign({}, state, {
      type,
      room,
      user,
      otherUser,
      punch,
      otherPunch,
      messages
    });
  } else {
    newState = state;
  }

  return newState;
};

export default gameReducers;
