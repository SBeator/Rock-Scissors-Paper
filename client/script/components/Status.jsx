import React, { Component, PropTypes } from 'react';

const propTypes = {
  otherChoose: PropTypes.string,
  result: PropTypes.number,
  room: PropTypes.string,
  messages: PropTypes.array
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
    return `${location.origin}?joinroom=${this.props.room}`;
  }

  getShareBlock() {
    return this.state.showShareBlock ?
        (<div className="status__share" >
          <div className="status__share-close" onClick={this.onClickCloseShare}>×</div>
          <p>Please Share this link to your friend</p>
          <p>{this.getShareLinkString()}</p>
        </div>) :
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
          Room: {this.props.room}
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
