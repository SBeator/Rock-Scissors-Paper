import types from './types';

const punch = value => ({
  type: types.PUNCH,
  punch: value
});

export default {
  punch
};
