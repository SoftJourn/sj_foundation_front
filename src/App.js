import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'styles/styles.css';
import Nav from './components/nav';

/**
 * main component - wrapper for all pages
 */
class App extends Component {

  /**
   * render layout
   * @returns {XML}
   */
  render() {
    const { children } = this.props;
    return (
      <div>
        <Nav/>
        <div className="container projects">
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
function mapStateToProps() {
  return {};
}

/**
 * connect redux state and react component
 */
export default connect(mapStateToProps)(App);
