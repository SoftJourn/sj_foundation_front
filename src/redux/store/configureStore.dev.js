/* eslint global-require: off */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../../components/DevTools';

/**
 * configure store and apply thunk, api, logger middlewares
 * @param initialState
 * @returns {Object}
 */
export default function configureStore(initialState) {
    let loggerMiddleware = createLogger();

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, api, loggerMiddleware),
            DevTools.instrument()
        )
    );
    
    // live reload when code changing
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
}
