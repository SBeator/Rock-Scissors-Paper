import menu from './menu';
import room from './room';
import clientSide from './clientSide';

const action = {};

Object.assign(action, menu, room, clientSide);

export default action;
