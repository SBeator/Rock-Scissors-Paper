import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Menu from '../components/Menu.jsx';

const mapStateToProps = (state, ownProps) => ({
  show: state.menu.show
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createGame: () => {
    dispatch(actions.clickCreateRoom());
  },
  joinGame: (room) => {
    dispatch(actions.clickJoinRoom(room));
  }
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
