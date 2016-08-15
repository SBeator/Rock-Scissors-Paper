import ClientWebSocket from './ClientWebSocket.js';
import actions from '../../redux/actions';
import { actionToMessage, messageToAction } from '../../redux/actions/actionMessage';


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

  createRoom(user, recieveActionCallback) {
    this.sendMessage(actions.creatingRoom({ user }), recieveActionCallback);
  }

  joinRoom(room, user, recieveActionCallback) {
    this.sendMessage(actions.joiningRoom({ room, user }), recieveActionCallback);
  }

  punching(punch) {
    this.sendMessage(actions.punching({ punch }));
  }

  readying() {
    this.sendMessage(actions.readying());
  }

  sendMessage(action, recieveActionCallback) {
    return this.connectedSocket
      .then(() => {
        const message = actionToMessage(action);
        this.webSocket.send(message);
      })
      .then(() => {
        if (recieveActionCallback) {
          this.webSocket.on('message', (event) => {
            const recieveMessageObject = messageToAction(event.data);

            recieveActionCallback(recieveMessageObject);
          });
        }
      });
  }
}

export default GameConnect;
