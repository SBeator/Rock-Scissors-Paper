import ClientWebSocket from './ClientWebSocket.js';
import actions from '../../redux/actions';
import { actionToMessage, messageToAction } from '../../redux/actions/actionMessage';


class GameConnect {

  constructor(hostname, recieveActionCallback) {
    this.hostname = hostname;
    this.connectedSocket = this.connect()
      .then(() => {
        this.webSocket.on('message', (event) => {
          const recieveMessageObject = messageToAction(event.data);
          recieveActionCallback(recieveMessageObject);
        });
      });
  }

  connect() {
    this.webSocket = new ClientWebSocket(this.hostname);

    const connectPromise = new Promise((resolve, reject) => {
      this.webSocket.on('open', () => {
        resolve();
      });

      this.webSocket.on('error', () => {
        // TODO: Add reject handle logic
        reject();
      });
    });

    return connectPromise;
  }

  createRoom(user) {
    this.sendMessage(actions.creatingRoom({ user }));
  }

  joinRoom(room, user) {
    this.sendMessage(actions.joiningRoom({ room, user }));
  }

  punching(punch) {
    this.sendMessage(actions.punching({ punch }));
  }

  readying() {
    this.sendMessage(actions.readying());
  }

  sendMessage(action) {
    return this.connectedSocket
      .then(() => {
        const message = actionToMessage(action);
        this.webSocket.send(message);
      });
  }
}

export default GameConnect;
