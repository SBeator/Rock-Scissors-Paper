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
    messages: ['Please get ready']
  },
  [types.READYING]: {
    messages: ['Readying']
  },
  [types.READY]: {
    messages: ['You are ready, wait other player ready']
  },
  [types.OTHER_PLAYER_READY]: {
    messages: ['The other player is ready, please get ready']
  },
  [types.BOTH_PLAYER_READY]: {
    messages: ['Please punch']
  },
  [types.PUNCHING]: {
    messages: ['Punching']
  },
  [types.PUNCHED]: {
    messages: ['Waiting other player punch']
  },
  [types.OTHER_PLAYER_PUNCHED]: {
    messages: ['Other player is punched']
  },
  [types.BOTH_PLAYER_PUNCHED]: {
    messages: ['Other player is punched: {{punchNameMap[otherPunch]}}',
               '{{resultMap[(punch - otherPunch + 3) % 3]}}']
  }
};

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

// const stringHelper = {
//   punchNameMap,
//   resultMap
// };

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
    const { messages } = gameActionObject;

    const { punch, otherPunch } = action;

    messages.map((message) => message.replace(/{{([^{}]*)}}/, (match, parameter) => {
      return eval(parameter);
    }));

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
