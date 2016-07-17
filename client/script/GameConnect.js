import ClientWebSocket from './ClientWebSocket.js';

class GameConnect {

  constructor(room, user) {
    this.room = room;
    this.user = user;

    this.connectedSocket = this.connect();
  }

  connect() {
    this.webSocket = new ClientWebSocket();

    return new Promise((resolve, reject) => {
      this.webSocket.on('open', () => {
        resolve();
      });

      this.webSocket.on('error', () => {
        reject();
      });
    });
  }

  createRoom() {

  }
}

export default GameConnect;
