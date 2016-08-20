import types from '../actions/types';
import { locString } from '../../locales';

const punchNameMap = {
  0: 'rock',
  1: 'scissors',
  2: 'paper'
};

const resultMap = {
  0: 'resultDraw',
  1: 'resultLose',
  2: 'resultWin',
};

const gameActionTypes = {
  [types.IDLE]: {
    messageInfos: [{
      message: ''
    }]
  },
  [types.CREATING_ROOM]:
  {
    messageInfos: [{
      message: 'Creating room...'
    }]
  },
  [types.WAITING_IN_ROOM]: {
    messageInfos: [{
      message: 'Waiting other player join'
    }]
  },
  [types.JOINING_ROOM]: {
    messageInfos: [{
      message: 'Joining room'
    }]
  },
  [types.OTHER_PLAYER_JOINED]: {
    messageInfos: [{
      message: 'Please get ready'
    }]
  },
  [types.READYING]: {
    messageInfos: [{
      message: 'Readying'
    }]
  },
  [types.READY]: {
    messageInfos: [{
      message: 'You are ready, wait other player ready'
    }]
  },
  [types.OTHER_PLAYER_READY]: {
    appendMessage: true,
    messageInfos: [{
      message: 'The other player is ready, please get ready'
    }]
  },
  [types.BOTH_PLAYER_READY]: {
    messageInfos: [{
      message: 'Please punch'
    }]
  },
  [types.PUNCHING]: {
    messageInfos: [{
      message: 'Punching'
    }]
  },
  [types.PUNCHED]: {
    messageInfos: [{
      message: 'Waiting other player punch'
    }]
  },
  [types.OTHER_PLAYER_PUNCHED]: {
    messageInfos: [{
      message: 'Other player is punched'
    }]
  },
  [types.BOTH_PLAYER_PUNCHED]: {
    messageInfos: [{
      message: 'Other player punch result format',
      valueResolver: ({ otherPunch }) => ({
        punchName: locString(punchNameMap[otherPunch])
      })
    }, {
      message: 'Punch result',
      valueResolver: ({ punch, otherPunch }) => ({
        punchResult: locString(resultMap[(punch - otherPunch + 3) % 3])
      })
    }]
  }
};

const gameProperties = [
  'room',
  'user',
  'otherUser',
  'punch',
  'otherPunch'
];

const gameReducers = (state = { type: types.IDLE }, action) => {
  let newState;

  const gameActionObject = gameActionTypes[action.type];

  if (gameActionObject) {
    newState = {};
    const { type } = action;
    const { messageInfos, appendMessage } = gameActionObject;

    let messages = messageInfos.map(({ message, valueResolver }) => locString(
        message,
        valueResolver && valueResolver(action)
      ));

    if (appendMessage) {
      const oldMessages = state.messages || [];
      messages = [...oldMessages, ...messages];
    }

    Object.assign(newState, state, {
      type,
      messages
    });

    for (const property of gameProperties) {
      if (action[property] !== undefined) {
        Object.assign(newState, {
          [property]: action[property]
        });
      }
    }
  } else {
    newState = state;
  }

  return newState;
};

export default gameReducers;
