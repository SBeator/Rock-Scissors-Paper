import types from '../actions/types';
import { initLocales } from '../../locales';

const localesReducers = (state = {}, action) => {
  if (action.type === types.CLIENT_SIDE_INIT) {
    initLocales(state);
  }

  return state;
};

export default localesReducers;

