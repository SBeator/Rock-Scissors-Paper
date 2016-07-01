import React, { Component } from 'react';
import * as $ from 'jquery';

import Cookie from './../Cookie.js';

import Result from './Result.jsx';
import Choose from './Choose.jsx';

class GameControl extends Component {
  constructor(props) {
    super(props);

    const user = this.getUser();
    // let room;

    $.getJSON('/api/createroom', { user }, (data) => {
      console.log(data);
    }).catch((...args) => {
      console.log(args);
    });
  }

  getUser() {
    if (!this.user) {
      this.user = Cookie.getCookie('user');
    }

    if (!this.user) {
      this.user = Date.now();
      Cookie.getCookie('user', this.user);
    }

    return this.user;
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
