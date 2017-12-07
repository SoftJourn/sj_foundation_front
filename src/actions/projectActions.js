import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';
import {getBalance} from './userActions';
import {serialize} from '../utils/utils'

/**
 * fetches categories
 * @returns {{}}
 */
export function getProjectsCategories() {
    return {
        [CALL_API]: {
            types: [types.CATEGORIES_REQUEST, types.CATEGORIES_SUCCESS, types.CATEGORIES_FAILURE],
            endpoint: `categories`,
        },
    };
}

/**
 * get projects
 * @returns {{}}
 */
function fetchProjects(page = 1, query= {}) {
    return {
        [CALL_API]: {
            types: [types.PROJECTS_REQUEST, types.PROJECTS_SUCCESS, types.PROJECTS_FAILURE],
            endpoint: `projects`,
        },
    };
}

/**
 * change url and dispatch search action
 */
export function getProjects(page = 1, query = {}) {
    return (dispatch) => {
        if (page === 1) {
            dispatch({type: types.PROJECTS_INIT})
        } else {
            dispatch({type: types.PROJECTS_LOAD_MORE})
        }
        return dispatch(fetchProjects(page, query));
    };
}


/**
 * get project
 * @param slug
 * @returns {{}}
 */
export function getProjectBySlug(slug) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_REQUEST, types.PROJECT_SUCCESS, types.PROJECT_FAILURE],
      endpoint: `projects/${slug}`,
    },
  };
}

/**
 * get project by id
 * @param id
 * @returns {{}}
 */
export function getProjectById(id) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_PREVIEW_REQUEST, types.PROJECT_PREVIEW_SUCCESS, types.PROJECT_PREVIEW_FAILURE],
      endpoint: `get_project?id=${id}`,
    },
  };
}

/**
 * get project
 * @param slug
 * @returns {{}}
 */
export function getProjectMetaBySlug(slug) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_META_REQUEST, types.PROJECT_META_SUCCESS, types.PROJECT_META_FAILURE],
      endpoint: `projects/?filter[name]=${slug}`,
    },
  };
}

export function pledgeProject(id, amount) {
  return (dispatch, getState) => {
    return dispatch(pledgeProjectRequest(id, amount)).then(
      () => {
        dispatch(updateProjectById(id));
        dispatch(getBalance());
      }
    );
  }
}

export function withdrawProject(id) {
  return (dispatch) => {
    return dispatch(withdrawProjectRequest(id)).then(
      () => {
        dispatch(updateProjectById(id));
        dispatch(getBalance());
      });
  }
}

export function pledgeProjectRequest(id, amount) {
  return {
    [CALL_API]: {
      method: 'POST',
      types: [types.PLEDGE_REQUEST, types.PLEDGE_SUCCESS, types.PLEDGE_FAILURE],
      endpoint: 'back_project',
      body: {
        project_id: id,
        amount,
      }
    },
  };
}

export function withdrawProjectRequest(id) {
  return {
    [CALL_API]: {
      method: 'POST',
      types: [types.WITHDRAW_REQUEST, types.WITHDRAW_SUCCESS, types.WITHDRAW_FAILURE],
      endpoint: `withdraw?projectId=${id}`,
      body: {
        project_id: id,
      }
    },
  };
}

/**
 * get project by id
 * @param id
 * @returns {{}}
 */
export function updateProjectById(id) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_UPDATE_REQUEST, types.PROJECT_UPDATE_SUCCESS, types.PROJECT_UPDATE_FAILURE],
      endpoint: `get_project?id=${id}`,
    },
  };
}

export function loadMore() {
  return (dispatch, getState) => {
    dispatch({type: types.PROJECTS_LOAD_MORE});
    dispatch(getProjectBySlug())
  }
}
