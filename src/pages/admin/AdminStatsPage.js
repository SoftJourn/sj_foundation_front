import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminStats from '../../components/admin/AdminStats'
import {fetchAdminStats} from '../../actions/adminActions'

class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: props.admin,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      admin: props.admin,
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchAdminStats());
  }

  render() {
    return (
      <div>
        <div className="container">
          <AdminStats
            stats={this.state.admin.stats}
            isFetching={this.state.admin.isFetching}
          />
        </div>
      </div>
    );
  }
}


/**
 * map redux state to project page properties
 * @function mapStateToProps
 * @param {object} state - redux state object
 * @param {object} ownProps - redux properties
 */
function mapStateToProps(state, ownProps) {
  return {
    admin: state.admin
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(AdminPage);