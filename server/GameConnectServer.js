import actionType from '../redux/actions/types';
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
      case actionType.CREATING_ROOM:
        createRoom({ user }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendJoinRoomMessage(data.currentUser, data.room);
          }
        });
        break;
      case actionType.JOINING_ROOM:
        if (!room) {
          // Handle err;
        }

        console.log('Socket joinroom userAndRoomData:');
        console.log({ user, room });
        joinRoom({ user, room }, (err, data) => {
          if (err) {
            // Handle err;
          } else {
            this.sendJoinRoomMessage(data.currentUser, data.room);

            this.sendMessageToOther(
              actionType.OTHER_PLAYER_JOINED,
              {
                otherUser: data.user
              });
          }
        });
        break;
      case actionType.PUNCHING:
        this.sendMessageToOther(
          actionType.OTHER_PLAYER_PUNCHED,
          {
            otherPunch: punch
          });
        break;
      default:
        break;
    }
  }

  disconnect() {
    this.sendMessageToOther(actionType.OTHER_PLAYER_LEFT);
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

    const otherUser = !!otherUserConnect && otherUserConnect.user;

    const type = otherUser ? actionType.OTHER_PLAYER_JOINED : actionType.WAITING_IN_ROOM;
    this.sendMessage(
      type,
      {
        user,
        room,
        otherUser
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
