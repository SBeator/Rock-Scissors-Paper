import React, { PropTypes } from 'react';

import GameControl from './GameControl.jsx';

const propTypes = {
  roomToJoin: PropTypes.string
};

function Game({ roomToJoin }) {
  return (
    <div className="game">
      <div className="game__panel">
        <GameControl roomToJoin={roomToJoin} />
      </div>
    </div>);
}

Game.propTypes = propTypes;

export default Game;
