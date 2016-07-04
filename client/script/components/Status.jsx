import React, { Component, PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  otherChoose: PropTypes.number,
  result: PropTypes.number,
};
class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  getClasses() {
    return `result ${this.props.show ? 'result--display' : ''}`;
  }

  getChooseString() {
    return Status.chooseValueStringMap[this.props.otherChoose];
  }

  getResultString() {
    return Status.resultValueStringMap[this.props.result];
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
