/* eslint react/prefer-stateless-function: off */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';
import {IntlProvider} from 'react-intl-redux'

/**
 * Dev Root component to transfer data to react app & init DevTool
 * @class Root
 */
export default class Root extends Component {

  /**
   * transfer data through Provider component
   * React Route sync data with URL
   * @returns {XML}
   */
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <IntlProvider>
          <div>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}

/**
 * Root Prop Validation
 * @type {{store: *, history: *}}
 */
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
