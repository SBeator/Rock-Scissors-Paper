import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import Welcome from '../components/Welcome.jsx';

const mapStateToProps = (state, ownProps) => ({
  locales: state.locales,
  show: state.layout === 'welcome'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clickMultiGame: () => {
    dispatch(actions.clickMultiGame());
  }
});

const WelcomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

export default WelcomeContainer;
