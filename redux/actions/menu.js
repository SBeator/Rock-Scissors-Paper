import types from './types';

const clickCreateRoom = () => ({
  type: types.CREATING_ROOM
});

const clickJoinRoom = (room) => ({
  type: types.CREATING_ROOM,
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
