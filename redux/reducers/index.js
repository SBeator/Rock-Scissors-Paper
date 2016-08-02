import { combineReducers } from 'redux';
import menu from './menu';
import room from './room';
import status from './status';

export default combineReducers({
  menu,
  room,
  status
});
