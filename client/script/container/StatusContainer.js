import { connect } from 'react-redux';
import Status from '../components/Status.jsx';

const mapStateToProps = (state, ownProps) => {
  const status = state.status;

  return {
    room: state.room.room,
    messages: status.messages,
    pageOrigin: status.pageOrigin
  };
};

const StatusContainer = connect(
  mapStateToProps
)(Status);

export default StatusContainer;
