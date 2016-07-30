import types from './types.json';

const joinRoom = room => ({
  type: types.JOIN_ROOM,
  room
});

export default {
  joinRoom
};
