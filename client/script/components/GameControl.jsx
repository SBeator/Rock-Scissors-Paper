import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import Cookie from './../Cookie.js';
import Event, { CustomEvents } from './../Event.js';

import GameConnect from '../GameConnect.js';
import { messageType } from '../../../config/websocket.json';

// import Status from './Status.jsx';
// import Menu from './Menu.jsx';
import Choose from './Choose.jsx';

import StatusContainer from '../container/StatusContainer';
import MenuContainer from '../container/MenuContainer';
import WelcomeContainer from '../container/WelcomeContainer';

const propTypes = {
  room: PropTypes.string,
  hostname: PropTypes.string,
  pageOrigin: PropTypes.string
};

class GameControl extends Component {
  constructor(props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.recieveConnectMessage = this.recieveConnectMessage.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getRoom = this.getRoom.bind(this);

    this.state = {
      showMenu: true,
      multiPlayer: false,
      gameType: 'ide'
    };

    this.onSubmitChoose = this.onSubmitChoose.bind(this);
  }

  componentDidMount() {
    Event.bindEvent(CustomEvents.SUBMIT_CHOOSE, this.onSubmitChoose);
    this.gameConnect = new GameConnect(this.props.hostname);

    if (this.props.room) {
      this.joinGame(this.props.room);
    }
  }

  onSubmitChoose(choose) {
    if (!this.state.multiPlayer) {
      const otherChoose = (Math.random() * 3) | 0;

      this.setResultMessage(choose, otherChoose);
    } else {
      this.gameConnect.punch(choose);
      this.waitOtherPlayPunch(choose);
    }
  }

  getInfoFromCookie(name) {
    if (!this.state[name]) {
      this.state[name] = Cookie.getCookie(name);
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
    alert('join room fail');
    this.singlePlayerGame();
  }

  singlePlayerGame() {
  }

  multiPlayersGame(hasOtherUser) {
    this.setState({
      showMenu: false,
      multiPlayer: true,
    });

    if (!hasOtherUser) {
      const messages = [
        'Please wait for other player joining'
      ];

      this.setState({
        gameType: 'waiting',
        messages
      });
    } else {
      this.setState({
        showMenu: false,
        multiPlayer: true,
      });
      this.otherPlayerIsJoined();
    }

    // this.waitOtherPlayerJoin();
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

  waitMyselfPunch(otherChoose) {
    this.otherChoose = otherChoose;

    if (this.choose) {
      this.bothPlayersArePunched();
    } else {
      const messages = [
        'Other player is punched!'
      ];

      this.setState({
        messages
      });
    }
  }

  waitOtherPlayPunch(choose) {
    this.choose = choose;

    if (this.otherChoose) {
      this.bothPlayersArePunched();
    } else {
      const messages = [
        'please wait other player punch'
      ];

      this.setState({
        messages
      });
    }
  }

  bothPlayersArePunched() {
    this.setResultMessage(this.choose, this.otherChoose);

    this.choose = null;
    this.otherChoose = null;
  }

  createGame() {
    const user = this.getUser();

    this.gameConnect.createRoom(user, this.recieveConnectMessage);
  }

  joinGame(room) {
    const user = this.getUser();

    this.gameConnect.joinRoom(room, user, this.recieveConnectMessage);
  }

  recieveConnectMessage(messageObject) {
    const { room, user, hasOtherUser, punch } = messageObject;

    switch (messageObject.type) {
      case messageType.joinRoom:
        this.setRoom(room);
        this.setUser(user);
        this.multiPlayersGame(hasOtherUser);
        break;

      case messageType.otherUserJoin:
        this.otherPlayerIsJoined();
        break;

      case messageType.otherUserPunch:
        this.waitMyselfPunch(punch);
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="game-control">
        <Choose
          gameType={this.state.gameType}
        />

        <StatusContainer />
        { /*
        <Status
          room={this.state.room}
          messages={this.state.messages}
          pageOrigin={this.props.pageOrigin}
        />
        */ }

        <MenuContainer />
        { /*
          <Menu show={this.state.showMenu} createGame={this.createGame} joinGame={this.joinGame} />
        */}

        <WelcomeContainer />

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
