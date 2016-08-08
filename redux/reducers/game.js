import types from '../actions/types';

const gameActionType = [
  types.IDLE,
  types.CREATING_ROOM,
  types.WAITING_IN_ROOM,
  types.JOINING_ROOM,
  types.OTHER_PLAYER_JOINED,
  types.READYING,
  types.READY,
  types.OTHER_PLAYER_READY,
  types.PUNCHING,
  types.PUNCHED,
  types.OTHER_PLAYER_PUNCHED
];

const gameReducers = (state = { type: types.IDLE }, action) => {
  let newState;

  if (gameActionType.indexOf(action.type) >= 0) {
    const {
    type,
    room,
    user,
    otherUser,
    punch,
    otherPunch } = action;

    newState = Object.assign({}, state, {
      type,
      room,
      user,
      otherUser,
      punch,
      otherPunch });
  } else {
    newState = state;
  }

  return newState;
};

export default gameReducers;
