import { connect } from 'react-redux';
import Game from '../components/Game.jsx';

const mapStateToProps = (state, ownProps) => ({
  hostname: state.status.hostname,
  game: state.game
});

const GameContainer = connect(
  mapStateToProps
)(Game);

export default GameContainer;
