import React, { PropTypes } from 'react';

import GameControl from './GameControl.jsx';

const propTypes = {
  room: PropTypes.string,
  hostname: PropTypes.string,
};

function Game(props) {
  return (
    <div className="game">
      <div className="game__panel">
        <GameControl {...props} />
      </div>
    </div>);
}

Game.propTypes = propTypes;

export default Game;
