import { w3cwebsocket as W3cwebsocket } from 'websocket';

import { port, protocal } from '../../config/websocket.json';

const validEvents = [
  'open',
  'error',
  'close',
  'message'
];

class ClientWebSocket {
  constructor(room, user) {
    this.hostname = location.hostname;
    this.eventHandlers = {};
    this.connect();
  }

  connect() {
    this.client = new W3cwebsocket(`ws://${this.hostname}:${port}/`, protocal);

    validEvents.forEach((event) => {
      const eventKey = `on${event}`;
      const eventHandlers = this.eventHandlers;
      this.client[eventKey] = (...args) => {
        if (eventHandlers[eventKey] && eventHandlers[eventKey].length) {
          eventHandlers[eventKey].forEach((eventHandler) => {
            eventHandler(...args);
          });
        }
      };
    });
  }

  on(event, callback) {
    if (validEvents.indexOf(event) >= 0) {
      if (!this[`on${event}`]) {
        this[`on${event}`] = [];
      }

      this[`on${event}`].push(callback);
    }
  }

  send(str) {
    let success = false;
    if (this.client.readyState === this.client.OPEN) {
      this.client.send(str);
      success = true;
    }

    return success;
  }
}

export default ClientWebSocket;
