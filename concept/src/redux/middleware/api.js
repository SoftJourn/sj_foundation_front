let API_ROOT = '/';

if (typeof eventure_config !== 'undefined' && eventure_config.hasOwnProperty('api_root')) {
  API_ROOT = eventure_config.api_root;
}

require('es6-promise');

/**
 * call api and return results
 * This makes every API response have the same shape
 * @param {string} endpoint - api endpint
 */
function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Object.assign({}, json);
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

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
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

  next(actionWith({ type: requestType }));

  return callApi(endpoint, store).then(
    response => next(actionWith({
      response,
      type: successType,
      meta: {
        mixpanel: {
          event: 'Api results',
          props: getMixpanelProps(store.getState().form, response),
        },
      },
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }))
  );
};
