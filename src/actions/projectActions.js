import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';
import {getBalance} from './userActions';
import {serialize} from '../utils/utils'
import {
    NEW_PROJECT_STEP_1,
    NEW_PROJECT_STEP_2,
    NEW_PROJECT_STEP_3,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAILURE
} from 'ActionTypes'

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
            endpoint: `projects?` + serialize(query),
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
 * get project by id
 * @param id
 * @returns {{}}
 */
export function getProjectById(id) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_REQUEST, types.PROJECT_SUCCESS, types.PROJECT_FAILURE],
      endpoint: `projects/${id}`,
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

export function newProjectStep1(title) {
    return { type: NEW_PROJECT_STEP_1, title };
}

export function newProjectStep2(category) {
    return { type: NEW_PROJECT_STEP_2, category };
}

export function newProjectStep3(description, image, video, attachments) {
    return { type: NEW_PROJECT_STEP_3, description, image, video, attachments };
}

export function createProject(title, price, canDonate, due, category, description) {
    return {
        [CALL_API]: {
            types: [ PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAILURE],
            method: 'POST',
            endpoint: 'projects',
            body: {
                title,
                price,
                canDonate,
                due,
                category,
                description
            }
        }
    };
}
