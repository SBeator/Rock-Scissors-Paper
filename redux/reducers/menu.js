import types from '../actions/types';

const menuReducer = (state = { show: true }, action) => {
  switch (action.type) {
    case types.CLICK_CREATE_ROOM:
    case types.CLICK_JOIN_ROOM:
      return { show: false };
    default:
      return state;
  }
};

export default menuReducer;
