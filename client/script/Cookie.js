const Days = 30;
const time = Days * 24 * 60 * 60 * 1000;

const Cookie = {
  setCookie(name, value) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const exp = new Date();
    exp.setTime(exp.getTime() + time);

    if (Cookie.getCookie(name)) {
      document.cookie.replace(reg, `${name}=${escape(value)};expires=${exp.toGMTString()}`);
    } else {
      document.cookie += `${name}=${escape(value)};expires=${exp.toGMTString()}`;
    }
  },

  getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const match = document.cookie.match(reg);

    let result;
    if (match) {
      result = unescape(match[2]);
    } else {
      result = null;
    }

    return result;
  }
};

export default Cookie;
