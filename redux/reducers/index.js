import { combineReducers } from 'redux';
import room from './room';
import status from './status';
import layout from './layout';

export default combineReducers({
  room,
  status,
  layout
});
