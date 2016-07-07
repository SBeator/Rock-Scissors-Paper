import React, { Component } from 'react';
import * as $ from 'jquery';

import Cookie from './../Cookie.js';
import Event, { CustomEvents } from './../Event.js';

import Status from './Status.jsx';
import Menu from './Menu.jsx';
import Choose from './Choose.jsx';

class GameControl extends Component {
  constructor(props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getRoom = this.getRoom.bind(this);

    this.state = {
      showMenu: true,
      showStatus: false,
      multiPlayer: false,
      gameType: 'ide'
    };

    this.onSubmitChoose = this.onSubmitChoose.bind(this);

    Event.bindEvent(CustomEvents.SUBMIT_CHOOSE, this.onSubmitChoose);
  }

  onSubmitChoose(choose) {
    if (!this.state.multiPlayer) {
      const otherChoose = (Math.random() * 3) | 0;
      const result = (3 + otherChoose - choose) % 3;

      this.setState({
        otherChoose,
        result,
        showStatus: true
      });
    } else {
      const user = this.getUser();
      const room = this.getRoom();
      const punch = choose;
      $.getJSON(
        '/api/punch',
        {
          user,
          room,
          punch
        })
        .then(() => {
          this.waitOtherPlayPunch(choose);
        });
    }
  }

  getInfoFromCookie(name) {
    if (!this.state[name]) {
      this.state[name] = Cookie.getCookie(name);
    }

    if (!this.state[name]) {
      this.state[name] = Date.now();
      Cookie.setCookie(name, this.state[name]);
    }

    return this.state[name];
  }

  setInfoToCookie(name, value) {
    Cookie.setCookie(name, value);

    this.setState({
      [name]: value
    });
  }

  getUser() {
    return this.getInfoFromCookie('user');
  }

  setUser(user) {
    this.setInfoToCookie('user', user);
  }

  getRoom() {
    return this.getInfoFromCookie('room');
  }

  setRoom(room) {
    this.setInfoToCookie('room', room);
  }

  dbLoadError() {
    this.singlePlayerGame();
  }

  singlePlayerGame() {
  }

  multiPlayersGame() {
    this.setState({
      showMenu: false,
      multiPlayer: true,
      gameType: 'waiting'
    });

    this.waitOtherPlayerJoin();
  }

  waitOtherPlayerJoin() {
    const room = this.getRoom();
    $.getJSON('/api/getroomstatus', { room })
      .then((data) => {
        if (data.users.length > 1) {
          this.otherPlayerIsJoined();
        } else {
          setTimeout(() => {
            this.waitOtherPlayerJoin();
          }, 1000);
        }
      });
  }

  otherPlayerIsJoined() {
    this.setState({
      gameType: 'ready'
    });
  }

  waitOtherPlayPunch(choose) {
    const room = this.getRoom();
    $.getJSON('/api/getroomstatus', { room })
      .then((data) => {
        if (data.users &&
            data.users.length === 2 &&
            data.punches[data.users[0]] !== undefined &&
            data.punches[data.users[1]] !== undefined) {
          const currentUser = this.getUser();

          const otherUser = data.users.filter((user) => currentUser !== user);
          const otherChoose = data.punches[otherUser];

          this.otherPlayerIsPunched(choose, otherChoose);
        } else {
          setTimeout(() => {
            this.waitOtherPlayPunch(choose);
          }, 1000);
        }
      });
  }

  otherPlayerIsPunched(choose, otherChoose) {
    const result = (3 + otherChoose - choose) % 3;

    this.setState({
      otherChoose,
      result,
      showStatus: true
    });
  }

  createGame() {
    const user = this.getUser();

    $.getJSON('/api/createroom', { user })
      .then((data) => {
        const room = data.room;

        if (room) {
          this.setRoom(room);

          this.multiPlayersGame();
        } else {
          this.dbLoadError();
        }
      })
      .catch((...args) => {
        this.dbLoadError();
      });
  }

  joinGame(room) {
    const user = this.getUser();
    $.getJSON('/api/joinroom', { room, user })
      .then((data) => {
        this.setRoom(room);
        this.multiPlayersGame();
      })
      .catch((...args) => {
        this.dbLoadError();
      });
  }

  render() {
    return (
      <div className="game-control">
        <Choose
          gameType={this.state.gameType}
        />
        <Status
          show={this.state.showStatus}
          otherChoose={this.state.otherChoose}
          result={this.state.result}
          room={this.state.room}
        />
        <Menu show={this.state.showMenu} createGame={this.createGame} joinGame={this.joinGame} />
      </div>
    );
  }
}

GameControl.propTypes = {

};

export default GameControl;
