import types from './types.json';

const clickCreateRoom = () => ({
  type: types.CLICK_CREATE_ROOM
});

const clickJoinRoom = (room) => ({
  type: types.CLICK_CREATE_ROOM,
  room
});

export default {
  clickCreateRoom,
  clickJoinRoom
};
