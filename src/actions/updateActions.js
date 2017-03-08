import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';
import {browserHistory} from 'react-router';
import {updateProjectById, getProjectById} from './projectActions';


export function createUpdate(projectId, content) {
    return {
        [CALL_API]: {
            method: 'POST',
            types: [types.UPDATE_POST_REQUEST, types.UPDATE_POST_SUCCESS, types.UPDATE_POST_FAILURE],
            body: {
                project_id: projectId,
                content,
            },
            endpoint: 'add_update'
        },
    };
}

export function createUpdateAndRedirect(projectId, content, redirectUrl) {
  return (dispatch) => {
    dispatch(createUpdate(projectId, content))
    .then(dispatch(updateProjectById(projectId)))
    .then(browserHistory.push(redirectUrl));
  }
}