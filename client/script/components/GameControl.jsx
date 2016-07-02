import React, { Component } from 'react';
import * as $ from 'jquery';

import Cookie from './../Cookie.js';

import Result from './Result.jsx';
import Choose from './Choose.jsx';

class GameControl extends Component {
  constructor(props) {
    super(props);

    let user = this.getUser();
    let room = this.getRoom();

    $.getJSON('/api/createroom', { user, room }, (data) => {
      user = data.user;
      room = data.room;

      if (user && room) {
        this.user = user;
        this.room = room;
      } else {
        this.dbLoadError();
      }
    }).catch((...args) => {
      this.dbLoadError();
    });
  }

  getInfoFromCookie(name) {
    if (!this[name]) {
      this[name] = Cookie.getCookie(name);
    }

    if (!this[name]) {
      this[name] = Date.now();
      Cookie.getCookie(name, this[name]);
    }

    return this[name];
  }

  getUser() {
    return this.getInfoFromCookie('user');
  }

  getRoom() {
    return this.getInfoFromCookie('room');
  }

  dbLoadError() {
    this.setSinglePlayerGame();
  }

  singlePlayerGame() {
  }

  multiPlayersGame() {
  }

  render() {
    return (
      <div className="game-control">
        <Result />
        <Choose />
      </div>
    );
  }
}

GameControl.propTypes = {

};

export default GameControl;
