import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { checkUser } from 'actions/userActions';

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
      projects: props.projects
    }
  }

  componentDidMount() {
    this.props.dispatch(checkUser())
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
        {/*<Header user={this.state.user} />*/}
        <div className="main-content">
          {children}
        </div>
        <Footer categories={this.state.projects.categories}/>
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
export default connect(mapStateToProps)(App);
