import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Game from '../components/Game.jsx';

const mapStateToProps = (state, ownProps) => ({
  hostname: state.status.hostname,
  game: state.game
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Change punch to punching and punched
  dispatchGameAction: (gameState) => {
    dispatch(actions.gameAction(gameState));
  }
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
