import types from '../actions/types';

import gameTypes from '../../config/gameTypes.json';

const gameReducers = (state = { type: gameTypes.IDLE }, action) => {
  switch (action.type) {
    // TODO: remove the first two lines after JOIN_ROOM action is created
    case types.CREATING_ROOM:
    case types.JOINING_ROOM:
      return {
        type: gameTypes.OTHER_PLAYER_JOINED
      };
    case types.JOIN_ROOM:
      return {
        type: action.otherUser ? gameTypes.OTHER_PLAYER_JOINED : gameTypes.WAITING,
        otherUser: action.otherUser,
        user: action.user
      };
    default:
      return state;
  }
};

export default gameReducers;
