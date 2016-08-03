import types from './types';

const clickCreateRoom = () => ({
  type: types.CLICK_CREATE_ROOM
});

const clickJoinRoom = (room) => ({
  type: types.CLICK_CREATE_ROOM,
  room
});

const clickMultiGame = () => ({
  type: types.CLICK_MULTI_GAME
});

export default {
  clickCreateRoom,
  clickJoinRoom,
  clickMultiGame
};
