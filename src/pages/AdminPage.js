import React, { Component } from 'react';
import {setCoinsToAll} from '../actions/adminActions';
import { connect } from 'react-redux';

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      status: '',
    };
  }

  render() {
    return (
      <div>
        <div className="container">
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
  return {};
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(AdminPage);