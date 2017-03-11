import React, {PropTypes} from 'react';
import Spinner from '../helper/Spinner';

class AdminStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: props.stats,
      isFetching: props.isFetching,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      stats: props.stats,
      isFetching: props.isFetching,
    });
  }

  render() {
    const {stats, isFetching} = this.state;
    if (isFetching) {
      return <Spinner />
    }
    return (
      <div>
        <h4>Stats</h4>
        <p>Projects: {stats.projects}</p>
      </div>
    );
  }

}

AdminStats.propTypes = {
  stats: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

AdminStats.defaultProps = {};

export default AdminStats;