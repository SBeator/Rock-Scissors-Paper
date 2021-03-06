import React, { Component, PropTypes } from 'react';

import { locString } from '../../../locales';

const propTypes = {
  show: PropTypes.bool,
  clickMultiGame: PropTypes.func,
};

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClickMultiGame = this.onClickMultiGame.bind(this);
  }

  onClickMultiGame() {
    this.props.clickMultiGame();
  }

  getClasses() {
    return `welcome ${this.props.show ? '' : 'hide'}`;
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <div className="welcome__title">{locString('Game title')}</div>
        <div className="welcome__menu">
          <button
            className="btn"
            onClick={this.onClickMultiGame}
          >
              {locString('Start game')}
          </button>
        </div>
        <div className="welcome__copy_right">{locString('Author')}</div>
      </div>);
  }
}

Welcome.propTypes = propTypes;

export default Welcome;
