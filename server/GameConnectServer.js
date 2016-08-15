import actions from '../redux/actions';
import actionType from '../redux/actions/types';
import { actionToMessage, messageToAction } from '../redux/actions/actionMessage';

import { createRoom, joinRoom } from './db.promise.js';

const gameConnectsInRoom = {};

class GameConnectServer {
  constructor(connection) {
    this.connection = connection;
  }

  recieveMessage(message) {
    const messageObject = messageToAction(message);

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
            console.log('Websocket: recieve data after join room:');
            console.log(data);

            this.sendJoinRoomMessage(data.currentUser, data.room);
            this.sendJoinRoomMessageToOther(data.currentUser, data.room);
          }
        });
        break;
      case actionType.PUNCHING:
        this.sendPunchMessages(punch);
        break;
      case actionType.READYING:
        this.sendReadyMessages(punch);
        break;
      default:
        break;
    }
  }

  disconnect() {
    this.sendActionMessage(actions.otherPlayerLeft());
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

  getUser() {
    return this.user;
  }

  setPunch(punch) {
    this.punch = punch;
  }

  getPunch(punch) {
    return this.punch;
  }

  setReady(ready) {
    this.ready = ready;
  }

  getReady() {
    return this.ready;
  }

  getOtherUserConnectInRoom() {
    let otherGameConnect;
    if (gameConnectsInRoom[this.room] && gameConnectsInRoom[this.room].length > 1) {
      otherGameConnect = gameConnectsInRoom[this.room]
        .filter(gameConnect => gameConnect !== this)[0];
    }

    return otherGameConnect;
  }

  sendActionMessage(action) {
    console.log('Websocket: action to be send:');
    console.log(action);

    const message = actionToMessage(action);

    console.log(`Websocket: send messageObject: ${message}`);

    this.connection.sendUTF(message);
  }

  sendActionMessageToOther(action) {
    const otherUserConnect = this.getOtherUserConnectInRoom();

    if (otherUserConnect) {
      otherUserConnect.sendActionMessage(action);
    }
  }

  sendJoinRoomMessage(user, room) {
    this.setRoom(room);
    this.setUser(user);

    const otherUserConnect = this.getOtherUserConnectInRoom();
    const otherUser = !!otherUserConnect && otherUserConnect.getUser();

    if (otherUser) {
      this.sendActionMessage(actions.otherPlayerJoinedRoom({ otherUser, user, room }));
    } else {
      this.sendActionMessage(actions.waitingInRoom({ user, room }));
    }
  }

  sendJoinRoomMessageToOther(user, room) {
    const otherUserConnect = this.getOtherUserConnectInRoom();

    const otherUser = !!otherUserConnect && otherUserConnect.user;

    if (otherUser) {
      this.sendActionMessageToOther(
        actions.otherPlayerJoinedRoom({
          otherUser: user,
          user: otherUser,
          room }));
    }
  }

  sendPunchMessages(punch) {
    this.setPunch(punch);

    const otherGameConnect = this.getOtherUserConnectInRoom();

    if (otherGameConnect) {
      const otherPunch = otherGameConnect.getPunch();

      if (otherPunch) {
        this.sendActionMessage(actions.bothPlayerPunched({
          punch
        }));
        this.sendActionMessageToOther(actions.bothPlayerPunched({
          otherPunch: punch,
          punch: otherPunch
        }));

        this.setPunch(undefined);
        otherGameConnect.setPunch(undefined);
      } else {
        this.sendActionMessage(actions.punched({ punch }));
        this.sendActionMessageToOther(actions.otherPlayerPunched({ otherPunch: punch }));
      }
    } else {
      this.sendActionMessage(actions.punched({ punch }));
    }
  }

  sendReadyMessages() {
    this.setReady(true);

    const otherGameConnect = this.getOtherUserConnectInRoom();

    if (otherGameConnect) {
      const otherReady = otherGameConnect.getReady();

      if (otherReady) {
        this.sendActionMessage(actions.bothPlayerReady());
        this.sendActionMessageToOther(actions.bothPlayerReady());

        this.setReady(false);
        otherGameConnect.setReady(false);
      } else {
        this.sendActionMessage(actions.ready());
        this.sendActionMessageToOther(actions.otherPlayerReady());
      }
    } else {
      this.sendActionMessage(actions.ready());
    }
  }
}

export default GameConnectServer;
