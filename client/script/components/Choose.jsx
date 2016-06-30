import React, { Component } from 'react';

import Event, { CustomEvents } from './../Event.js';

class Choose extends Component {
  constructor(props) {
    super(props);

    // Event.bind(EventList.SUBMIT_CHOOSE, () => {});
    this.onChooseChange = this.onChooseChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChooseChange() {
    this.refs.submit.disabled = false;
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

export default Choose;
