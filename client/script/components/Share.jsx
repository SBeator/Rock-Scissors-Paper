import React, { Component, PropTypes } from 'react';

import {
  path,
  textPara
} from '../../../config/qrcode.json';

const propTypes = {
  link: PropTypes.string,
  onClose: PropTypes.func,
  pageOrigin: PropTypes.string
};

class Share extends Component {
  constructor(props) {
    super(props);

    this.onClickCloseShare = this.onClickCloseShare.bind(this);
  }

  onClickCloseShare() {
    this.props.onClose();
  }

  getQRcodeLink() {
    return `${this.props.pageOrigin}/api/${path}?${textPara}=${this.props.link}`;
  }

  render() {
    return (
      <div className="share" >
        <div className="share__close" onClick={this.onClickCloseShare}>×</div>
        <p>Please Share this link to your friend</p>
        <p>{this.props.link}</p>
        <p>Or you can ask your find to scan the qrcode:</p>
        <img className="share__qrcode" alt="Share link QR code" src={this.getQRcodeLink()} />
      </div>);
  }
}

Share.propTypes = propTypes;

export default Share;
