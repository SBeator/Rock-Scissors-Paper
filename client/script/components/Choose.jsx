import React, { Component, PropTypes } from 'react';

import Event, { CustomEvents } from './../Event.js';

const propTypes = {
  gameType: PropTypes.string,
};

class Choose extends Component {
  constructor(props) {
    super(props);

    this.onChooseChange = this.onChooseChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.submit.disabled = (this.props.gameType !== 'ready');
  }

  componentDidUpdate() {
    this.refs.submit.disabled = (this.props.gameType !== 'ready');
  }

  onChooseChange() {
    if (this.props.gameType === 'ready') {
      this.refs.submit.disabled = false;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    Event.fireEvent(CustomEvents.SUBMIT_CHOOSE, this.refs.form.choose.value);
  }

  render() {
    return (
      <div className="choose">
        <form onSubmit={this.onSubmit} ref="form" >
          <label htmlFor="rock">石头: </label>
          <input
            type="radio"
            name="choose"
            id="rock"
            className="choose__radio"
            value="0"
            onChange={this.onChooseChange}
          />
          <label htmlFor="scissors">剪刀: </label>
          <input
            type="radio"
            name="choose"
            id="scissors"
            className="choose__radio"
            value="1"
            onChange={this.onChooseChange}
          />
          <label htmlFor="paper">布: </label>
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
