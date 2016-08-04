import { combineReducers } from 'redux';
import room from './room';
import game from './game';
import status from './status';
import layout from './layout';

export default combineReducers({
  room,
  game,
  status,
  layout
});
