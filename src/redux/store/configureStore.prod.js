import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';


/**
 * configure store, init reducers and apply thunk, api, middlwares
 * @param initialState
 * @returns {Object}
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api)
  );
}
