import types from '../actions/types.json';

const roomReducers = (state = {}, action) => {
  switch (action.type) {
    case types.JOIN_ROOM:
      return {
        room: action.room
      };
    default:
      return state;
  }
};

export default roomReducers;
