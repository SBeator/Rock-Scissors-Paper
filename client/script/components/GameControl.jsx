import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import Cookie from './../Cookie.js';

import GameConnect from '../GameConnect.js';

import actionType from '../../../redux/actions/types';
import actions from '../../../redux/actions';

// import Status from './Status.jsx';
// import Menu from './Menu.jsx';
// import Choose from './Choose.jsx';

import StatusContainer from '../container/StatusContainer';
import MenuContainer from '../container/MenuContainer';
import WelcomeContainer from '../container/WelcomeContainer';
import OtherPlayerChooseContainer from '../container/OtherPlayerChooseContainer';
import ChooseContainer from '../container/ChooseContainer';
import ReadyContainer from '../container/ReadyContainer';

const sendMessageGameTypes = [
  actionType.CREATING_ROOM,
  actionType.JOINING_ROOM,
  actionType.WAITING_IN_ROOM,
  actionType.OTHER_PLAYER_JOINED,
  actionType.PUNCHING,
  actionType.READYING
];

const propTypes = {
  hostname: PropTypes.string,
  game: PropTypes.object,
  dispatchGameAction: PropTypes.func
};

class GameControl extends Component {
  constructor(props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.recieveActionCallback = this.recieveActionCallback.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getRoom = this.getRoom.bind(this);

    this.state = {
      showMenu: true,
      gameType: 'ide'
    };
  }

  componentDidMount() {
    this.gameConnect = new GameConnect(this.props.hostname, this.recieveActionCallback);

    console.log(this.props.game);
    // if (this.props.game.) {
    //   this.joinGame(this.props.room);
    // }

    this.currectGameType = this.props.game.type;
    const gameState = this.props.game;
    this.handleGameState(gameState);
  }

  componentWillUpdate(nextProps) {
    const gameState = nextProps.game;
    if (this.currectGameType !== gameState.type) {
      this.currectGameType = gameState.type;

      this.handleGameState(gameState);
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

  handleGameState(gameState) {
    const { room, user, punch } = gameState;

    if (sendMessageGameTypes.indexOf(gameState.type) >= 0) {
      const action = actions.createGameAction({
        type: gameState.type,
        room,
        user,
        punch
      });
      this.gameConnect.sendMessage(action);
    }
  }

  createGame() {
    const user = this.getUser();
    this.gameConnect.createRoom(user);
  }

  joinGame(room) {
    const user = this.getUser();
    this.gameConnect.joinRoom(room, user);
  }

  joinedGame({ room, user }) {
    this.setRoom(room);
    this.setUser(user);
  }

  punching(choose) {
    this.gameConnect.punching(choose);
    // this.waitOtherPlayPunch(choose);
  }

  recieveActionCallback(action) {
    // const { room, user, hasOtherUser, punch } = messageObject;

    console.log('recieve action:');
    console.log(action);
    this.props.dispatchGameAction(action);

    // switch (messageObject.type) {
    //   case actionType.joinRoom:
    //     this.setRoom(room);
    //     this.setUser(user);
    //     this.multiPlayersGame(hasOtherUser);
    //     break;

    //   case messageType.otherUserJoin:
    //     this.otherPlayerIsJoined();
    //     break;

    //   case messageType.otherUserPunch:
    //     this.waitMyselfPunch(punch);
    //     break;

    //   default:
    //     break;
    // }
  }

  render() {
    return (
      <div className="game-control">

        <OtherPlayerChooseContainer />
        <ChooseContainer />
        { /*
        <Choose
          gameType={this.state.gameType}
          submitChoose={this.onSubmitChoose}
        />
        */ }

        <StatusContainer />
        { /*
        <Status
          room={this.state.room}
          messages={this.state.messages}
          pageOrigin={this.props.pageOrigin}
        />
        */ }

        <ReadyContainer />

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
