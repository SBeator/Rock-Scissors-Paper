import { messageType } from '../config/websocket.json';
import { createRoom, joinRoom, findRoom, punch } from './db.js';

const gameConnectRooms = {};

class GameConnectServer {
  constructor(connection) {
    this.connection = connection;
  }

  sendMessage(type, messageObject) {
    const message = JSON.stringify(Object.assign({}, messageObject, { type }));

    this.connection.sendUTF(message);
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

  recieveMessage(message) {
    const messageObject = this.parseMessageObject(message);

    if (messageObject.error) {
      // Handle err;
    }

    const { user, room } = messageObject;

    switch (messageObject.type) {
      case messageType.createRoom:
        createRoom({ user }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendMessage(
              messageType.createRoom,
              {
                user: data.user,
                room: data.room
              });

            gameConnectRooms[data.room] = [this];
          }
        });
        break;
      case messageType.joinRoom:
        if (!room) {
          // Handle err;
        }

        joinRoom({ user, room }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendMessage(
              messageType.joinRoom,
              {
                user: data.user,
                room: data.room
              });
          }
        });
        break;
      default:
        break;
    }
  }

  disconnect() {
  }
}

export default GameConnectServer;
