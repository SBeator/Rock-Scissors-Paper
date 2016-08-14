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
  type: types.PUNCHED,
  punch
});

const otherPlayerPunched = ({ otherPunch }) => ({
  type: types.OTHER_PLAYER_PUNCHED,
  otherPunch
});

const bothPlayerPunched = ({ punch, otherPunch }) => ({
  type: types.BOTH_PLAYER_PUNCHED,
  punch,
  otherPunch
});

const gameAction = ({ type, room, user, otherUser, punch, otherPunch }) => ({
  type,
  room,
  user,
  otherUser,
  punch,
  otherPunch
});

export default {
  creatingRoom,
  waitingInRoom,
  joiningRoom,
  otherPlayerJoinedRoom,
  punching,
  punched,
  otherPlayerPunched,
  bothPlayerPunched,
  gameAction
};
