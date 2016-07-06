import React, { Component, PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  createGame: PropTypes.func,
  joinGame: PropTypes.func,
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const target = event.target;
    const menu = target.dataset.menu;

    switch (menu) {
      case 'create':
        this.props.createGame();
        break;
      case 'join':
        this.props.joinGame(this.refs.room.value);
        break;
      default:
        break;
    }
  }

  getClasses() {
    return `menu ${this.props.show ? '' : 'hide'}`;
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <button className="btn" onClick={this.onClick} data-menu="create">Create Game</button>
        <button className="btn" onClick={this.onClick} data-menu="join">Join Game</button>
        <label htmlFor="room-number">Room:</label>
        <input type="text" id="room-number" ref="room" />
      </div>
    );
  }
}

Menu.propTypes = propTypes;

export default Menu;
