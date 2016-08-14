import { connect } from 'react-redux';
import Game from '../components/Game.jsx';

const mapStateToProps = (state, ownProps) => ({
  hostname: state.status.hostname,
  game: state.game
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  dispatchGameAction: (action) => {
    dispatch(action);
  }
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
