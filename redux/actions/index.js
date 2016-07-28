import actionType from './types.json';

const joinRoom = room => ({
  type: actionType.JOIN_ROOM,
  room
});

export default {
  joinRoom
};
