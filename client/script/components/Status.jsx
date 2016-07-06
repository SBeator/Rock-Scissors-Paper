import React, { Component, PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  otherChoose: PropTypes.string,
  result: PropTypes.number,
  room: PropTypes.string
};

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  getClasses() {
    // return `result ${this.props.show ? 'result--display' : ''}`;
    return 'result result--display';
  }

  getChooseString() {
    return Status.chooseValueStringMap[this.props.otherChoose];
  }

  getResultString() {
    return Status.resultValueStringMap[this.props.result];
  }

  getRoomInfo() {
    let roomInfo;

    if (this.props.room) {
      roomInfo = <p>Room: {this.props.room}</p>;
    } else {
      roomInfo = '';
    }

    return roomInfo;
  }

  render() {
    return (
      <div className={this.getClasses()} >
        {this.getRoomInfo()}
        <p>对方出的是：{this.getChooseString()}</p>
        <p>{this.getResultString()}</p>
      </div>
    );
  }
}

Status.chooseValueStringMap = {
  0: '石头',
  1: '剪刀',
  2: '布'
};

Status.resultValueStringMap = {
  0: '打平了',
  1: '你赢了',
  2: '你输了'
};

Status.propTypes = propTypes;

export default Status;
