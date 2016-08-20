let locales;

const initLocales = (loc) => {
  locales = loc;
};

const locString = (wordFormat, valueObj) => {
  const locStringFormet = locales && locales[wordFormat] ? locales[wordFormat] : wordFormat;
  return locStringFormet.replace(/{{([^{}]*)}}/, (match, parameter) => valueObj[parameter]);
};

export {
  initLocales,
  locString
};
