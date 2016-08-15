import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import actionTypes from '../../../redux/actions/types';
import Ready from '../components/Ready.jsx';

const menuTextMap = {
  [actionTypes.OTHER_PLAYER_JOINED]: 'Ready',
  [actionTypes.BOTH_PLAYER_PUNCHED]: 'Ready',
  [actionTypes.OTHER_PLAYER_READY]: 'Ready'
};

const mapStateToProps = (state, ownProps) => ({
  menuText: menuTextMap[state.game.type]
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
