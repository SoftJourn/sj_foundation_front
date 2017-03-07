import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


export function createUpdate(updateId, content) {
    return {
        [CALL_API]: {
            method: 'POST',
            types: [types.UPDATE_POST_REQUEST, types.UPDATE_POST_SUCCESS, types.UPDATE_POST_FAILURE],
            endpoint: `updates?post=${updateId}&content=${content}`
        },
    };
}