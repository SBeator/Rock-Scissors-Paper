import types from './types';

const clientSideInit = (hostname, pageOrigin) => ({
  type: types.CLIENT_SIDE_INIT,
  hostname,
  pageOrigin
});

const setLocale = (locale) => ({
  type: types.SET_LOCALE,
  locale
});

export default {
  clientSideInit,
  setLocale
};
