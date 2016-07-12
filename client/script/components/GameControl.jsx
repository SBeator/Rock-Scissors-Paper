import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import Cookie from './../Cookie.js';
import Event, { CustomEvents } from './../Event.js';

import Status from './Status.jsx';
import Menu from './Menu.jsx';
import Choose from './Choose.jsx';

const propTypes = {
  roomToJoin: PropTypes.string
};

class GameControl extends Component {
  constructor(props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getRoom = this.getRoom.bind(this);

    this.state = {
      showMenu: true,
      multiPlayer: false,
      gameType: 'ide'
    };

    this.onSubmitChoose = this.onSubmitChoose.bind(this);

    Event.bindEvent(CustomEvents.SUBMIT_CHOOSE, this.onSubmitChoose);

    if (this.props.roomToJoin) {
      this.joinGame(this.props.roomToJoin);
    }
  }

  onSubmitChoose(choose) {
    if (!this.state.multiPlayer) {
      const otherChoose = (Math.random() * 3) | 0;

      this.setResultMessage(choose, otherChoose);
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

  setResultMessage(choose, otherChoose) {
    const result = (3 + otherChoose - choose) % 3;

    const messages = [
      `对方出的是:${GameControl.chooseValueStringMap[otherChoose]}`,
      GameControl.resultValueStringMap[result]
    ];

    this.setState({
      messages
    });
  }

  dbLoadError() {
    this.singlePlayerGame();
  }

  singlePlayerGame() {
  }

  multiPlayersGame() {
    const messages = [
      'Please wait for other player joining'
    ];

    this.setState({
      showMenu: false,
      multiPlayer: true,
      gameType: 'waiting',
      messages
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
    const messages = [
      'Please punch'
    ];

    this.setState({
      gameType: 'ready',
      messages
    });
  }

  waitOtherPlayPunch(choose) {
    const room = this.getRoom();
    const user = this.getUser();

    const messages = [
      'please wait other player punch'
    ];

    this.setState({
      messages
    });

    $.getJSON(
      '/api/getroomstatus',
      {
        room
      })
      .then((data) => {
        if (data.users &&
            data.users.length === 2 &&
            data.punches[data.users[0]] !== undefined &&
            data.punches[data.users[1]] !== undefined) {
          const otherUser = data.users.filter((dataUser) => user !== dataUser);
          const otherChoose = data.punches[otherUser];

          this.otherPlayerIsPunched(choose, otherChoose);

          $.getJSON('/api/getroomstatus',
            {
              room,
              user,
              removePunch: true
            });
        } else {
          setTimeout(() => {
            this.waitOtherPlayPunch(choose);
          }, 1000);
        }
      });
  }

  otherPlayerIsPunched(choose, otherChoose) {
    this.setResultMessage(choose, otherChoose);
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
          room={this.state.room}
          messages={this.state.messages}
        />
        <Menu show={this.state.showMenu} createGame={this.createGame} joinGame={this.joinGame} />
      </div>
    );
  }
}

GameControl.chooseValueStringMap = {
  0: '石头',
  1: '剪刀',
  2: '布'
};

GameControl.resultValueStringMap = {
  0: '打平了',
  1: '你赢了',
  2: '你输了'
};


GameControl.propTypes = propTypes;

export default GameControl;
