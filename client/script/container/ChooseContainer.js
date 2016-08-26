import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Choose from '../components/Choose.jsx';

import actionsTypes from '../../../redux/actions/types';

const mapStateToProps = (state, ownProps) => ({
  hide: false,
  ready: state.game.type === actionsTypes.BOTH_PLAYER_READY ||
    state.game.type === actionsTypes.OTHER_PLAYER_PUNCHED,
  stylePunching: state.game.type === actionsTypes.PUNCHING,
  stylePunched: state.game.type === actionsTypes.PUNCHED,
  styleBothPunched: state.game.type === actionsTypes.BOTH_PLAYER_PUNCHED
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  punching: (punch) => {
    dispatch(actions.punching({ punch }));
  }
});

const ChooseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

export default ChooseContainer;
