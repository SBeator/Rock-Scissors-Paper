import types from './types';

const creatingRoom = () => ({
  type: types.CREATING_ROOM
});

const waitingInRoom = ({ room, user }) => ({
  type: types.WAITING_IN_ROOM,
  room,
  user
});

const joiningRoom = ({ room }) => ({
  type: types.JOINING_ROOM,
  room
});

const otherPlayerJoinedRoom = ({ room, user, otherUser }) => ({
  type: types.OTHER_PLAYER_JOINED,
  room,
  user,
  otherUser
});

const readying = () => ({
  type: types.READYING
});

const ready = () => ({
  type: types.READY
});

const otherPlayerReady = () => ({
  type: types.OTHER_PLAYER_READY
});

const bothPlayerReady = () => ({
  type: types.BOTH_PLAYER_READY
});

const changingPunch = () => ({
  type: types.CHANGING_PUNCH
});

const otherChangingPunch = () => ({
  type: types.OTHER_CHANGING_PUNCH
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

const otherPlayerLeft = () => ({
  type: types.OTHER_PLAYER_LEFT
});

const createGameAction = ({ type, room, user, otherUser, punch, otherPunch }) => ({
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
  readying,
  ready,
  otherPlayerReady,
  bothPlayerReady,
  otherChangingPunch,
  changingPunch,
  punching,
  punched,
  otherPlayerPunched,
  bothPlayerPunched,
  otherPlayerLeft,
  createGameAction
};
