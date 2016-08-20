import { combineReducers } from 'redux';
import game from './game';
import status from './status';
import layout from './layout';
import locale from './locale';

export default combineReducers({
  game,
  status,
  layout,
  locale
});
