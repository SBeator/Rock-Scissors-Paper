const eventHandlerMap = {};

export const CustomEvents = {
  SUBMIT_CHOOSE: Symbol()
};

const Event = {
  fireEvent(name, ...args) {
    if (eventHandlerMap[name]) {
      const handlers = eventHandlerMap[name];
      handlers.forEach((handler) => {
        setTimeout(() => {
          handler(args);
        }, 0);
      });
    }
  },

  bindEvent(name, callback) {
    const handlers = eventHandlerMap[name] || [];
    if (handlers.indexOf(callback) < 0) {
      handlers.push(callback);
    }

    eventHandlerMap[name] = handlers;
  }
};

export default Event;
