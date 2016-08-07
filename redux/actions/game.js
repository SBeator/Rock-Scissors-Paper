import types from './types';

const creatingRoom = () => ({
  type: types.CREATING_ROOM
});

const waitingInRoom = ({ room, user }) => ({
  type: types.WAITING_IN_ROOM,
  room,
  user
});

const joiningRoom = (room) => ({
  type: types.JOINING_ROOM,
  room
});

const otherPlayerJoinedRoom = ({ room, user, otherUser }) => ({
  type: types.OTHER_PLAYER_JOINED,
  room,
  user,
  otherUser
});

const punching = ({ punch }) => ({
  type: types.PUNCHING,
  punch
});

const punched = ({ punch }) => ({
  type: types.PUNCH,
  punch
});

const otherPlayerPunched = ({ punch }) => ({
  type: types.OTHER_PLAYER_PUNCHED,
  punch
});

export default {
  creatingRoom,
  waitingInRoom,
  joiningRoom,
  otherPlayerJoinedRoom,
  punching,
  punched,
  otherPlayerPunched
};
