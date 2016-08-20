import types from '../actions/types';
import I18n from '../../locales';

const localeReducers = (state = {}, action) => {
  const newState = Object.assign({}, state);
  const locale = action.locale;
  let i18n;

  switch (action.type) {
    case types.SET_LOCALE:
      i18n = new I18n(locale);

      Object.assign(newState, {
        locale,
        locString: i18n.locString
      });
      break;
    default:
  }

  return newState;
};

export default localeReducers;

