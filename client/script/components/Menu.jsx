import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

const propTypes = {
  show: PropTypes.bool,
  createGame: PropTypes.func,
  joinGame: PropTypes.func,
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onJoinRoomSubmit = this.onJoinRoomSubmit.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
  }

  onClick(event) {
    const target = event.target;
    const menu = target.dataset.menu;

    switch (menu) {
      case 'create':
        this.props.createGame();
        break;
      case 'join':
        $(this.refs.form).slideDown();
        break;
      default:
        break;
    }
  }

  onRoomChange() {
    const roomNumber = this.refs.room.value;

    if (roomNumber) {
      this.refs.submit.disabled = false;
    }
  }

  onJoinRoomSubmit(event) {
    event.preventDefault();

    const roomNumber = this.refs.room.value;

    if (roomNumber) {
      this.props.joinGame(this.refs.room.value);
    }
  }

  getClasses() {
    return `menu ${this.props.show ? '' : 'hide'}`;
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <div className="menu__block">
          <button className="btn" onClick={this.onClick} data-menu="create">Create Game</button>
          <button className="btn" onClick={this.onClick} data-menu="join">Join Game</button>
          <form className="menu--join-form hide" ref="form" onSubmit={this.onJoinRoomSubmit}>
            <label htmlFor="room-number">Room:</label>
            <input type="text" id="room-number" ref="room" onChange={this.onRoomChange} />
            <input
              type="submit"
              className="btn"
              value="&#8730;"
              disabled="disabled"
              ref="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

Menu.propTypes = propTypes;

export default Menu;
