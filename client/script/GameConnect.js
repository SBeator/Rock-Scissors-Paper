import ClientWebSocket from './ClientWebSocket.js';

class GameConnect {

  constructor() {
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

  createMessage(type, messageObject) {
    Object.assign(messageObject, { type });

    return JSON.stringify(messageObject);
  }

  sendMessage(type, messageObject) {
    return this.connectedSocket
      .then(() => {
        const message = this.createMessage(type, messageObject);
        this.webSocket.send(message);
      });
  }

  createRoom(user) {
    this.sendMessage('createRoom', { user });
  }

  joinRoom(room, user) {
    this.sendMessage('joinRoom', { room, user });
  }
}

export default GameConnect;
