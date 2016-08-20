class I18n {
  i18n(locale) {
    this.locale = locale;

    this.translate = this.translate.bind();
  }

  locString(wordFormat, valueObj) {
    const word = this.locale[wordFormat];
    return word.replace(/{{([^{}]*)}}/, (match, parameter) => valueObj[parameter]);
  }

}

export default I18n;
