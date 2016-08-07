import types from '../actions/types';

const layoutReducer = (state = 'welcome', action) => {
  switch (action.type) {
    case types.CLICK_MULTI_GAME:
      return 'menu';
    case types.CREATING_ROOM:
    case types.JOINING_ROOM:
      return 'game';
    default:
      return state;
  }
};

export default layoutReducer;
