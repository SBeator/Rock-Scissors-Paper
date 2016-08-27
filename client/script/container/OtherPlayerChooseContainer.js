import { connect } from 'react-redux';
import Choose from '../components/Choose.jsx';

import actionsTypes from '../../../redux/actions/types';

const mapStateToProps = (state, ownProps) => {
  const game = state.game;
  let otherPunch;
  if (game.type === actionsTypes.OTHER_CHANGING_PUNCH) {
    otherPunch = (Math.random() * 3) | 0;
  }

  return {
    hide: !game.otherUser,
    ready: false,
    stylePunching: false,
    stylePunched: game.type === actionsTypes.OTHER_PLAYER_PUNCHED,
    styleBothPunched: game.type === actionsTypes.BOTH_PLAYER_PUNCHED,
    isOtherPlayer: true,
    activePunch: game.otherPunch || otherPunch
  };
};

const OtherPlayerChooseContainer = connect(
  mapStateToProps
)(Choose);

export default OtherPlayerChooseContainer;
