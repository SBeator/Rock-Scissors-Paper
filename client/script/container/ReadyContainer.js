import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import actionTypes from '../../../redux/actions/types';
import Ready from '../components/Ready.jsx';

const showMenuActions = [
  actionTypes.OTHER_PLAYER_JOINED,
  actionTypes.BOTH_PLAYER_PUNCHED,
  actionTypes.OTHER_PLAYER_READY
];

const mapStateToProps = (state, ownProps) => ({
  menuText: state.status.readyMenuText,
  show: showMenuActions.indexOf(state.game.type) >= 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  readying: () => {
    dispatch(actions.readying());
  }
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ready);

export default MenuContainer;
