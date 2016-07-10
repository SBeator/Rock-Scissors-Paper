import React from 'react';
import ReactDOM from 'react-dom';

import i18nCore from 'i18n-core';
import stringEn from '../../i18n/en.json';
import stringZh from '../../i18n/zh.json';

import Game from './components/Game.jsx';

const i18n = i18nCore({
  en: stringEn,
  zh: stringZh
});

/* eslint-disable */
console.log(i18n.lang('zh').__('resultLose'));
console.log(i18n.lang('en').__('resultLose'));
/* eslint-enable */

 // hello!

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
