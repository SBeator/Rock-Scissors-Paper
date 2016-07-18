import { messageType } from '../config/websocket.json';
import { createRoom, joinRoom, findRoom, punch } from './db.js';

const gameConnectsInRoom = {};

class GameConnectServer {
  constructor(connection) {
    this.connection = connection;
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

            this.setRoom(data.room);
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

            this.setRoom(data.room);

            const otherUserConnect = this.getOtherUserConnectInRoom();
            if (otherUserConnect) {
              otherUserConnect.sendMessage(
                messageType.otherUserJoin,
                {
                  user: data.user
                });
            }
          }
        });
        break;
      default:
        break;
    }
  }

  disconnect() {
  }

  setRoom(room) {
    if (!gameConnectsInRoom[room]) {
      gameConnectsInRoom[room] = [this];
    } else {
      gameConnectsInRoom[room].push(this);
    }

    this.room = room;
  }

  getOtherUserConnectInRoom() {
    let otherGameConnect;
    if (gameConnectsInRoom[this.room].length > 1) {
      otherGameConnect = gameConnectsInRoom[this.room]
                          .filter(gameConnect => gameConnect !== this)[0];
    }

    return otherGameConnect;
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
}

export default GameConnectServer;
