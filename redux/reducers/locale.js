import types from '../actions/types';

const localeReducers = (state = {}, action) => {
  const newState = Object.assign({}, state);
  const locale = action.locale;

  switch (action.type) {
    case types.SET_LOCALE:
      Object.assign(newState, {
        locale
      });
      break;
    default:
  }

  return newState;
};

export default localeReducers;

