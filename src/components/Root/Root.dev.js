/* eslint react/prefer-stateless-function: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from '../DevTools';
import Main from 'components/Main';
import App from 'components/App';

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
                    <DevTools />
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
