import types from '../actions/types';

const statusReducers = (state = {}, action) => {
  const newState = {};

  switch (action.type) {
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

