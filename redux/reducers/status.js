import types from '../actions/types';

const statusReducers = (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case types.CLIENT_SIDE_INIT:
      Object.assign(newState, {
        hostname: action.hostname,
        pageOrigin: action.pageOrigin
      });
      break;
    case types.OTHER_PLAYER_JOINED:
      Object.assign(newState, {
        readyMenuText: 'Ready',
      });
      break;
    case types.BOTH_PLAYER_PUNCHED:
      Object.assign(newState, {
        readyMenuText: 'Restart',
      });
      break;
    default:
  }

  return newState;
};

export default statusReducers;

