import types from '../actions/types';

const statusReducers = (state = {}, action) => {
  const newState = {};

  switch (action.type) {
    // TODO: remove the first two lines after JOIN_ROOM action is created
    case types.CREATING_ROOM:
    case types.JOINING_ROOM:
    case types.JOIN_ROOM:
      Object.assign(newState, state, {
        messages: ['Please wait for other player joining']
      });
      return newState;

    case types.CLIENT_SIDE_INIT:
      Object.assign(newState, state, {
        hostname: action.hostname,
        pageOrigin: action.pageOrigin
      });
      return newState;

    default:
      return state;
  }
};

export default statusReducers;

