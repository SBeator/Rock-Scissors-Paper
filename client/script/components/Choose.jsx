import React, { Component, PropTypes } from 'react';

import $ from 'jquery';

import { locString } from '../../../locales';

const propTypes = {
  hide: PropTypes.bool,
  ready: PropTypes.bool,
  stylePunching: PropTypes.bool,
  stylePunched: PropTypes.bool,
  styleBothPunched: PropTypes.bool,
  isOtherPlayer: PropTypes.bool,
  activePunch: PropTypes.number,
  punching: PropTypes.func,
  changingPunch: PropTypes.func
};

class Choose extends Component {
  constructor(props) {
    super(props);

    this.onChooseChange = this.onChooseChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickChoose = this.onClickChoose.bind(this);
  }

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate() {
    this.onUpdate();
  }

  onUpdate() {
    this.refs.submit.disabled = !this.props.ready
                              || !$(this.refs.icons).find('.icon.active').length;

    if (this.props.activePunch !== undefined) {
      const $allIcons = $(this.refs.icons).find('.icon');
      $allIcons.removeClass('active');
      $allIcons.eq(this.props.activePunch).addClass('active');
    }
  }

  onClickChoose(event) {
    if (this.props.stylePunching || this.props.stylePunched || this.props.styleBothPunched) {
      return;
    }

    const allIcons = $(this.refs.icons).find('.icon');
    allIcons.removeClass('active');
    $(event.target).addClass('active');

    this.refs.submit.disabled = false;

    this.refs.form.choose.value = allIcons.index(event.target);

    this.props.changingPunch();
  }

  onChooseChange() {
    if (this.props.ready) {
      this.refs.submit.disabled = false;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.punching(this.refs.form.choose.value);
  }

  getClasses() {
    return 'choose'
      + ` ${this.props.stylePunching ? 'choose--punching' : ''}`
      + ` ${this.props.stylePunched ? 'choose--punched' : ''}`
      + ` ${this.props.styleBothPunched ? 'choose--both-punched' : ''}`
      + ` ${this.props.ready ? '' : 'choose--not-ready'}`
      + ` ${this.props.isOtherPlayer ? 'choose--other-player' : ''}`
      + ` ${this.props.hide ? 'hide' : ''}`;
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <div className="choose_icons" ref="icons" onClick={this.onClickChoose}>
          <div className="icon icon_rock"></div>
          <div className="icon icon_scissors"></div>
          <div className="icon icon_paper"></div>
        </div>
        <form onSubmit={this.onSubmit} ref="form" >
          <label htmlFor="rock">{locString('rock')}</label>
          <input
            type="radio"
            name="choose"
            id="rock"
            className="choose__radio"
            value="0"
            onChange={this.onChooseChange}
          />
          <label htmlFor="scissors">{locString('scissors')}</label>
          <input
            type="radio"
            name="choose"
            id="scissors"
            className="choose__radio"
            value="1"
            onChange={this.onChooseChange}
          />
          <label htmlFor="paper">{locString('paper')}</label>
          <input
            type="radio"
            name="choose"
            id="paper"
            className="choose__radio"
            value="2"
            onChange={this.onChooseChange}
          />
          <input
            type="submit"
            className="btn choose__submit"
            value="出拳"
            disabled="disabled"
            ref="submit"
          />
        </form>
      </div>);
  }
}

Choose.propTypes = propTypes;

export default Choose;
