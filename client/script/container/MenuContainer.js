import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Menu from '../components/Menu.jsx';

const mapStateToProps = (state, ownProps) => ({
  show: state.layout === 'menu'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createGame: () => {
    dispatch(actions.creatingRoom());
  },
  joinGame: (room) => {
    dispatch(actions.joiningRoom({ room }));
  }
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
