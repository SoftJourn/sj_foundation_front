/* eslint global-require: off */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';

/**
 * configure store and apply thunk, api, logger middlewares
 * @param initialState
 * @returns {Object}
 */
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, api),
        )
    );
    
    return store;
}
