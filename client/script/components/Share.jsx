import React, { Component, PropTypes } from 'react';

import QRCode from '../plugins/QRCode.js';

const propTypes = {
  link: PropTypes.string
};

class Share extends Component {
  constructor(props) {
    super(props);

    this.onClickCloseShare = this.onClickCloseShare.bind(this);

    this.state = {
      show: true
    };
  }

  componentDidMount() {
    if (!this.qrcode) {
      this.qrcode = new QRCode(this.refs.qrcode, this.props.link);
    }
  }

  onClickCloseShare() {
    this.setState({
      show: false
    });
  }

  getClasses() {
    return `share ${this.state.show ? '' : 'hide'}`;
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <div className="share__close" onClick={this.onClickCloseShare}>×</div>
        <p>Please Share this link to your friend</p>
        <p>{this.props.link}</p>
        <p>Or you can ask your find to scan the qrcode:</p>
        <div className="share__qrcode" ref="qrcode"></div>
      </div>);
  }
}

Share.propTypes = propTypes;

export default Share;
