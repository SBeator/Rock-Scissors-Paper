import ClientWebSocket from './ClientWebSocket.js';
import actionType from '../../redux/actions/types';

class GameConnect {

  constructor(hostname) {
    this.hostname = hostname;
    this.connectedSocket = this.connect();
  }

  connect() {
    this.webSocket = new ClientWebSocket(this.hostname);

    return new Promise((resolve, reject) => {
      this.webSocket.on('open', () => {
        resolve();
      });

      this.webSocket.on('error', () => {
        // TODO: Add reject handle logic
        reject();
      });
    });
  }

  createRoom(user, recieveMessageCallback) {
    this.sendMessage(actionType.CREATING_ROOM, { user }, recieveMessageCallback);
  }

  joinRoom(room, user, recieveMessageCallback) {
    this.sendMessage(actionType.JOINING_ROOM, { room, user }, recieveMessageCallback);
  }

  punching(punch) {
    this.sendMessage(actionType.PUNCHING, { punch });
  }

  createMessage(type, messageObject) {
    return JSON.stringify(Object.assign({}, messageObject, { type }));
  }

  parseMessageObject(message) {
    let messageObject;
    try {
      messageObject = JSON.parse(message);
    } catch (error) {
      messageObject = {
        error
      };
    }

    return messageObject;
  }

  sendMessage(type, messageObject, recieveMessageCallback) {
    return this.connectedSocket
      .then(() => {
        const message = this.createMessage(type, messageObject);
        this.webSocket.send(message);
      })
      .then(() => {
        if (recieveMessageCallback) {
          this.webSocket.on('message', (event) => {
            const recieveMessageObject = this.parseMessageObject(event.data);

            recieveMessageCallback(recieveMessageObject);
          });
        }
      });
  }
}

export default GameConnect;
