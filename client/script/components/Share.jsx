import React, { Component, PropTypes } from 'react';

import { locString } from '../../../locales';

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

  componentDidMount() {
    window.addEventListener('click', this.onClickWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickWindow);
  }

  onClickCloseShare() {
    this.props.onClose();
  }

  getQRcodeLink() {
    return `${this.props.pageOrigin}/api/${path}?${textPara}=${this.props.link}`;
  }

  render() {
    return (
      <div className="share" ref="share">
        <div className="share__bg_hover" onClick={this.onClickCloseShare}></div>
        <div className="share__block">
          <div className="share__close" onClick={this.onClickCloseShare}>×</div>
          <p>{locString('Share message')}</p>
          <p>{this.props.link}</p>
          <p>{locString('Qrcode message')}</p>
          <img className="share__qrcode" alt={locString('QRcode alt')} src={this.getQRcodeLink()} />
        </div>
      </div>);
  }
}

Share.propTypes = propTypes;

export default Share;
