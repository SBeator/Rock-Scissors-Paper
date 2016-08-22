import React, { Component, PropTypes } from 'react';

import Share from './Share.jsx';

import { locString } from '../../../locales';

const propTypes = {
  otherChoose: PropTypes.string,
  result: PropTypes.number,
  room: PropTypes.string,
  messages: PropTypes.array,
  pageOrigin: PropTypes.string
};

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showShareBlock: false
    };

    this.onClickRoom = this.onClickRoom.bind(this);
    this.onClickCloseShare = this.onClickCloseShare.bind(this);
  }

  onClickRoom() {
    const showShareBlock = !this.state.showShareBlock;
    this.setState({
      showShareBlock
    });
  }

  onClickCloseShare() {
    this.setState({
      showShareBlock: false
    });
  }

  getChooseString() {
    return Status.chooseValueStringMap[this.props.otherChoose];
  }

  getResultString() {
    return Status.resultValueStringMap[this.props.result];
  }

  getShareLinkString() {
    return `${this.props.pageOrigin}?room=${this.props.room}`;
  }

  getShareBlock() {
    return this.state.showShareBlock ?
      <Share
        link={this.getShareLinkString()}
        onClose={this.onClickCloseShare}
        pageOrigin={this.props.pageOrigin}
      /> :
      '';
  }

  getRoomInfo() {
    let roomInfo;

    if (this.props.room) {
      roomInfo = (
        <div
          className="status__room btn"
          onClick={this.onClickRoom}
        >
          {locString('roomTitleFormat', { room: this.props.room })}
        </div>);
    } else {
      roomInfo = '';
    }

    return roomInfo;
  }

  getStatusMessage() {
    return this.props.messages ?
      this.props.messages.map(
        message => <p className="status__message" key={message.slice(4)}>{message}</p>
        ) :
      '';
  }

  render() {
    return (
      <div className="status" >
        {this.getShareBlock()}
        {this.getRoomInfo()}
        {this.getStatusMessage()}
      </div>
    );
  }
}

Status.propTypes = propTypes;

export default Status;
