import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import { getBalance } from 'actions/userActions';
import {addLocaleData, FormattedMessage} from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'
import {updateIntl} from 'react-intl-redux'

addLocaleData([
  ...enLocaleData,
  ...ruLocaleData,
])

import 'styles/styles.scss';

/**
 * main component - wrapper for all pages
 */
class App extends Component {

  constructor(props) {
    super();
    if (window.wpApiSettings.user.ID) {
      props.dispatch(getBalance());
    }

    this.state = {
      user: props.user,
    }


    props.dispatch(updateIntl({
      locale: 'ua',
      messages: props.intl.messages,
    }))
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
        {/*<FormattedMessage id="app.greeting" defaultMessage="Hello!" />*/}
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
    intl: state.intl,
  };
}

/**
 * connect redux state and react component
 */
export default connect(mapStateToProps)(App);
