import React, { Component, PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  otherChoose: PropTypes.string,
  result: PropTypes.number,
  room: PropTypes.string,
  messages: PropTypes.array
};

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
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
      roomInfo = <div className="status__room btn">Room: {this.props.room}</div>;
    } else {
      roomInfo = '';
    }

    return roomInfo;
  }

  getStatusMessage() {
    return this.props.messages ?
      this.props.messages.map(
        message => <p className="status__message" key={message.slice(4)} >{message}</p>
        ) :
      '';
  }

  render() {
    return (
      <div className="status" >
        {this.getRoomInfo()}
        {this.getStatusMessage()}
      </div>
    );
  }
}

Status.propTypes = propTypes;

export default Status;
