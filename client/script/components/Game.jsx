import React from 'react';

import Result from './Result.jsx';
import Choose from './Choose.jsx';
import GameControl from './GameControl.jsx';

function Game() {
  return (
    <div className="game">
      <div className="game__panel">
        <Result />
        <Choose />
        <GameControl />
      </div>
    </div>);
}

export default Game;
