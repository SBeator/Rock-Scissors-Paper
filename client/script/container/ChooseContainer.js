import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Choose from '../components/Choose.jsx';

import gameTypes from '../../../config/gameTypes.json';

const mapStateToProps = (state, ownProps) => ({
  ready: state.game.type === gameTypes.OTHER_PLAYER_JOINED || state.game.type === gameTypes.WAITING
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  punch: (value) => {
    dispatch(actions.punch(value));
  }
});

const ChooseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

export default ChooseContainer;
