let locales;

const initLocales = (loc) => {
  locales = loc;
};

const locString = (wordFormat, valueObj) => {
  const locStringFormet = locales && locales[wordFormat] ? locales[wordFormat] : wordFormat;

  if (locStringFormet) {
    return locStringFormet.replace(/{{([^{}]*)}}/, (match, parameter) => valueObj[parameter]);
  }

  console.log('locStringFormet is undefined: locales: ');
  console.log(locales);
  console.log(`wordFormat: ${wordFormat}, valueObj: ${valueObj}`);
  return '';
};

export {
  initLocales,
  locString
};
