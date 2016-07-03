import React, { Component } from 'react';

import Event, { CustomEvents } from './../Event.js';

const propTypes = {};
class Result extends Component {
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
    return Result.chooseValueStringMap[this.state.otherChoose];
  }

  getResultString() {
    return Result.resultValueStringMap[this.state.result];
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <p>对方出的是：{this.getChooseString()}</p>
        <p>{this.getResultString()}</p>
      </div>
    );
  }
}

Result.chooseValueStringMap = {
  0: '石头',
  1: '剪刀',
  2: '布'
};

Result.resultValueStringMap = {
  0: '打平了',
  1: '你赢了',
  2: '你输了'
};

Result.propTypes = propTypes;

export default Result;
