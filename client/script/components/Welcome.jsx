import React, { Component, PropTypes } from 'react';

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
        <div className="welcome__title">石头，剪子，布</div>
        <div className="welcome__menu">
          <button className="btn" onClick={this.onClickMultiGame}>开始游戏</button>
        </div>
        <div className="welcome__copy_right">Xingxin Zeng</div>
      </div>);
  }
}

Welcome.propTypes = propTypes;

export default Welcome;
