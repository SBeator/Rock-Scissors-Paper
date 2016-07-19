import { messageType } from '../config/websocket.json';
import { createRoom, joinRoom } from './db.js';

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

    const { user, room, punch } = messageObject;

    switch (messageObject.type) {
      case messageType.createRoom:
        createRoom({ user }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendJoinRoomMessage(data.user, data.room);
          }
        });
        break;
      case messageType.joinRoom:
        if (!room) {
          // Handle err;
        }


        console.log('Socket joinroom userAndRoomData:');
        console.log({ user, room });
        joinRoom({ user, room }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendJoinRoomMessage(data.user, data.room);

            this.sendMessageToOther(
              messageType.otherUserJoin,
              {
                user: data.user
              });
          }
        });
        break;
      case messageType.punch:
        this.sendMessageToOther(
          messageType.otherUserPunch,
          {
            punch
          });
        break;
      default:
        break;
    }
  }

  disconnect() {
    this.sendMessageToOther(messageType.otherUserLeft);
  }

  setRoom(room) {
    if (!gameConnectsInRoom[room]) {
      gameConnectsInRoom[room] = [this];
    } else {
      gameConnectsInRoom[room].push(this);
    }

    this.room = room;
  }

  setUser(user) {
    this.user = user;
  }

  getOtherUserConnectInRoom() {
    let otherGameConnect;
    if (gameConnectsInRoom[this.room] && gameConnectsInRoom[this.room].length > 1) {
      otherGameConnect = gameConnectsInRoom[this.room]
        .filter(gameConnect => gameConnect !== this)[0];
    }

    return otherGameConnect;
  }

  sendMessage(type, messageObject) {
    const message = this.createMessageObject(type, messageObject);

    this.connection.sendUTF(message);
  }

  sendMessageToOther(type, messageObject) {
    const otherUserConnect = this.getOtherUserConnectInRoom();

    if (otherUserConnect) {
      otherUserConnect.sendMessage(type, messageObject);
    }
  }

  sendJoinRoomMessage(user, room) {
    this.setRoom(room);
    this.setUser(user);

    const otherUserConnect = this.getOtherUserConnectInRoom();

    const hasOtherUser = !!otherUserConnect;

    this.sendMessage(
      messageType.joinRoom,
      {
        user,
        room,
        hasOtherUser
      });
  }

  createMessageObject(type, messageObject) {
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
}

export default GameConnectServer;
