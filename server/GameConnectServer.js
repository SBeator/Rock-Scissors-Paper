import actionType from '../redux/actions/types';
import { createRoom, joinRoom } from './db.promise.js';

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
            console.log('Websocket: err after creatr room:');
            console.log(err);
          } else {
            console.log('Websocket: recieve data after create room:');
            console.log(data);

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
            console.log('Websocket: err after joinroom room:');
            console.log(err);
          } else {
            this.sendJoinRoomMessage(data.currentUser, data.room);
            this.sendJoinRoomMessageToOther(data.currentUser, data.room);
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

    console.log(`Websocket: send messageObject: ${message}`);

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

  sendJoinRoomMessageToOther(user, room) {
    const otherUserConnect = this.getOtherUserConnectInRoom();

    const otherUser = !!otherUserConnect && otherUserConnect.user;

    if (otherUser) {
      this.sendMessageToOther(
      actionType.OTHER_PLAYER_JOINED,
        {
          otherUser: user,
          room,
          user: otherUser
        });
    }
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
