import {authLogout} from '../../actions/loginActions';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';

let API_ROOT = 'http://localhost:3010/';
// require('es6-promise');


/**
 * call api and return results
 * This makes every API response have the same shape
 */
function callApi(endpoint, store, method, body) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  let apiHeaders = new Headers();
  var token = window.localStorage.getItem('token');
  apiHeaders.append('Authorization', token)
  apiHeaders.append('Content-Type', 'application/json')
  // if (window.wpApiSettings.nonce) {
  //   apiHeaders.append('X-WP-Nonce', window.wpApiSettings.nonce);
  // }

  return fetch(fullUrl+'?access_token='+token, {
      body: JSON.stringify(body),
      credentials: 'include',
      mode: 'cors',
      headers: apiHeaders,
      method: method
    })
    .then(response => {
        if (response.status === 401 || response.status === 403) {
          // store.dispatch(authLogout())
          // browserHistory.push('/');
          // window.location.href = '/';
        }
        return response.json().then(json => ({ json, response }))
    })
    .then(({ json, response }) => {
      const headers = response.headers;
      const pages = parseInt(headers.get('X-WP-TotalPages'));
      const result = {
        data: json,
        meta: {
          pages,
        }
      };
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Object.assign({}, result);
    })
    .catch((err) =>
      Promise.reject(err)
    );
}

export const CALL_API = Symbol('Call API');

/**
 * api redux middleware that interprets actions with CALL_API info specified.
 */
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, method } = callAPI;
  const { types, body } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof method !== 'string') {
    method = 'GET'
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType, ...body }));

  return callApi(endpoint, store, method, body).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      ...body,
      error: error.message || 'Something bad happened',
    }))
  );
};
