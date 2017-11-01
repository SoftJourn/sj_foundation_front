import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProject from '../components/create/CreateProject'

class StartProjectPage extends Component {

  constructor(props) {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <CreateProject />
      </div>
    )
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
    form: state.form,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(StartProjectPage);