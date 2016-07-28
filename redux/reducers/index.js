import { combineReducers } from 'redux';
import menu from './menu';
import room from './room';

export default combineReducers({
  menu,
  room
});
