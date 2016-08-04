import menu from './menu';
import room from './room';
import clientSide from './clientSide';
import game from './game';

const action = {};

Object.assign(action, menu, room, clientSide, game);

export default action;
