import { combineReducers } from 'redux';
import game from './game';
import status from './status';
import layout from './layout';
import locales from './locales';

export default combineReducers({
  game,
  status,
  layout,
  locales
});
