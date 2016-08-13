import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Choose from '../components/Choose.jsx';

import actionsTypes from '../../../redux/actions/types';

const mapStateToProps = (state, ownProps) => ({
  ready: state.game.type === actionsTypes.OTHER_PLAYER_JOINED
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  punch: (value) => {
    dispatch(actions.punching(value));
  }
});

const ChooseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

export default ChooseContainer;
