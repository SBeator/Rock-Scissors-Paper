import actionType from './types.json';

const clickCreateRoom = () => ({
  type: actionType.CLICK_CREATE_ROOM
});

const clickJoinRoom = (room) => ({
  type: actionType.CLICK_CREATE_ROOM,
  room
});

export default {
  clickCreateRoom,
  clickJoinRoom
};
