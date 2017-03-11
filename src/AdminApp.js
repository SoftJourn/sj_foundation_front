import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { getBalance } from 'actions/userActions';

import 'styles/styles.scss';

/**
 * main component - wrapper for all admin pages
 */
class AdminApp extends Component {

  constructor(props) {
    super();
    if (window.wpApiSettings.user.ID) {
      props.dispatch(getBalance());
    }

    this.state = {
      user: props.user,
      projects: props.projects
    }

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user,
      projects: newProps.projects
    });
  }

  /**
   * render layout
   * @returns {XML}
   */
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header user={this.state.user} />
        <div className="main-content">
          {children}
        </div>
      </div>
    );
  }
}

/**
 * map redux state to searchPage properties
 * @function mapStateToProps
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    projects: state.projects
  };
}

/**
 * connect redux state and react component
 */
export default connect(mapStateToProps)(AdminApp);
