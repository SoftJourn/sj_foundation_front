import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stats from '../components/layout/_Stats';
import ProjectsList from '../components/project/_ProjectsList';

const queryInit = {category: '', type: '', sort: ''};

class MainPage extends Component {

  constructor(props) {
    super();

  }

  render() {
    return (
        <div>
          <Stats />
          <ProjectsList />
        </div>
    );
  }
}

/**
 * map redux state
 * @function mapStateToProps
 * @param {object} state - redux state
 * @param {object} ownProps - redux properties
 */
function mapStateToProps(state, ownProps) {
  return {};
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(MainPage);