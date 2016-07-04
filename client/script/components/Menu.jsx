import React, { Component } from 'react';

import Event, { CustomEvents } from './../Event.js';

const propTypes = {};
class Menu extends Component {
  constructor(props) {
    super(props);

    this.onSubmitChoose = this.onSubmitChoose.bind(this);

    Event.bindEvent(CustomEvents.SUBMIT_CHOOSE, this.onSubmitChoose);

    this.state = {
      show: false,
    };
  }

  onSubmitChoose(value) {
    const otherChoose = (Math.random() * 3) | 0;
    const result = (3 + otherChoose - value) % 3;

    this.setState({
      otherChoose,
      result,
      show: true
    });
  }

  getClasses() {
    return `result ${this.state.show ? 'result--display' : ''}`;
  }

  getChooseString() {
    return Menu.chooseValueStringMap[this.state.otherChoose];
  }

  getResultString() {
    return Menu.resultValueStringMap[this.state.result];
  }

  render() {
    return (
      <div className="menu" >
        <p>对方出的是：{this.getChooseString()}</p>
        <p>{this.getResultString()}</p>
      </div>
    );
  }
}

Menu.propTypes = propTypes;

export default Menu;
