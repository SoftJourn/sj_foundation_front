import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import { getBalance } from 'actions/userActions';

import 'styles/styles.scss';

/**
 * main component - wrapper for all pages
 */
class App extends Component {

  constructor(props) {
    super();
    // if (window.wpApiSettings.user.ID) {
    //   props.dispatch(getBalance());
    // }

    this.state = {
      user: props.user,
    }

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
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
  };
}

/**
 * connect redux state and react component
 */
export default connect(mapStateToProps)(App);
