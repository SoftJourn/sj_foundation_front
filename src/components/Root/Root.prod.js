/* eslint react/prefer-stateless-function: off */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Main from '../Main';
import App from '../App';

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
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <App>
            <Main />
          </App>
        </div>
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
};
