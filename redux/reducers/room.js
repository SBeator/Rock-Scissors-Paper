import types from '../actions/types';

const roomReducers = (state = {}, action) => {
  switch (action.type) {
    // TODO: remove the first two lines after JOIN_ROOM action is created
    case types.CREATING_ROOM:
    case types.JOINING_ROOM:
    case types.JOIN_ROOM:
      return {
        room: action.room || '11111'
      };
    default:
      return state;
  }
};

export default roomReducers;
