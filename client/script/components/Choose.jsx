import React, { Component, PropTypes } from 'react';

import $ from 'jquery';

import { locString } from '../../../locales';

const propTypes = {
  ready: PropTypes.bool,
  punching: PropTypes.func
};

class Choose extends Component {
  constructor(props) {
    super(props);

    this.onChooseChange = this.onChooseChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickChoose = this.onClickChoose.bind(this);
  }

  componentDidMount() {
    this.refs.submit.disabled = !this.props.ready;
  }

  componentDidUpdate() {
    this.refs.submit.disabled = !this.props.ready;
  }

  onClickChoose(event) {
    const allIcons = $(this.refs.icons).find('.icon');
    allIcons.removeClass('active');
    $(event.target).addClass('active');

    this.refs.form.choose.value = allIcons.index(event.target);
  }

  onChooseChange() {
    if (this.props.ready) {
      this.refs.submit.disabled = false;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.punching(this.refs.form.choose.value);
    // Event.fireEvent(CustomEvents.SUBMIT_CHOOSE, this.refs.form.choose.value);
  }

  render() {
    return (
      <div className="choose">
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
