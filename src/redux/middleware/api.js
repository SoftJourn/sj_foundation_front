import 'whatwg-fetch'

// temporary hardcoded API_HOST to localhost
// TODO: need to move this into separate configuration
let API_ROOT = process.env.API_HOST || 'http://localhost:3000';

/**
 * call api and return results
 * This makes every API response have the same shape
 */
function callApi(endpoint, store, method, body) {
    const fullUrl = API_ROOT + '/' + endpoint;
    let apiHeaders = new Headers();
    apiHeaders.append('Content-Type', 'application/json');
    
    return fetch(fullUrl, {
        body: JSON.stringify(body),
        // mode: 'cors',
        // headers: apiHeaders,
        method: method
    })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                
            }
            return response.json().then(json => ({ json, response }))
        })
        .then(({ json, response }) => {
            const pages = 0;
            const result = {
                data: json,
                meta: {
                    pages,
                }
            };
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
