import types from './types';

const clientSideInit = (hostname, pageOrigin) => ({
  type: types.CLIENT_SIDE_INIT,
  hostname,
  pageOrigin
});

export default {
  clientSideInit
};
