import actionType from './types.json';

export const joinRoom = room => ({
  type: actionType.JOIN_ROOM,
  room
});
