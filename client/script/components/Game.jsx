import React from 'react';

import Result from './Result.jsx';
import Choose from './Choose.jsx';

function Game() {
  return (
    <div className="game">
      <div className="game__panel">
        <Result />
        <Choose />
      </div>
    </div>);
}

export default Game;
