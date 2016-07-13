import { w3cwebsocket as W3cwebsocket } from 'websocket';

import { port, protocal } from '../../server/websocket.js';

const validEvents = [
  'open',
  'error',
  'close',
  'message'
];

class GameWebSocket {
  constructor(room, user) {
    this.hostname = location.hostname;
    this.room = room;
    this.user = user;

    this.connect();
  }

  connect() {
    this.client = new W3cwebsocket(`ws://${this.hostname}:${port}/`, protocal);

    validEvents.forEach((event) => {
      const eventHandler = `on${event}`;
      this.client[eventHandler] = (...args) => {
        if (this[eventHandler]) {
          this[eventHandler](...args);
        }
      };
    });
  }

  on(event, callback) {
    if (validEvents.indexOf(event) >= 0) {
      this[`on${event}`] = callback;
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

export default GameWebSocket;
