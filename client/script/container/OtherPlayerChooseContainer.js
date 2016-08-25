import { connect } from 'react-redux';
import Choose from '../components/Choose.jsx';

import actionsTypes from '../../../redux/actions/types';

const mapStateToProps = (state, ownProps) => ({
  ready: false,
  stylePunching: false,
  stylePunched: state.game.type === actionsTypes.OTHER_PLAYER_PUNCHED,
  styleBothPunched: state.game.type === actionsTypes.BOTH_PLAYER_PUNCHED,
  isOtherPlayer: true,
  activePunch: state.game.otherPunch
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  punching: (punch) => {}
});

const OtherPlayerChooseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

export default OtherPlayerChooseContainer;
