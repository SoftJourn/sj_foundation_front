import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


/**
 * fetches projects
 * @returns {{}}
 */
function fetchSearch(page = 1, category = '') {
  return {
    [CALL_API]: {
      types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
      endpoint: category ? `projects/?per_page=9&page=${page}&categories[]=${category}` : `projects/?per_page=9&page=${page}` ,
    },
  };
}

/**
 * fetches categories
 * @returns {{}}
 */
export function fetchProjectCategories() {
  return {
    [CALL_API]: {
      types: [types.CATEGORIES_REQUEST, types.CATEGORIES_SUCCESS, types.CATEGORIES_FAILURE],
      endpoint: `categories`,
    },
  };
}

/**
 * change url and dispatch search action
 */
export function getProjects(page = 1, category = '') {
  return (dispatch) => {
    if (page === 1) {
      dispatch({type: types.SEARCH_INIT})
    } else {
      dispatch({type: types.SEARCH_LOAD_MORE})
    }
    return dispatch(fetchSearch(page, category));
  };
}



/**
 * get project
 * @param slug
 * @param page
 * @returns {{}}
 */
export function getProjectBySlug(slug) {
  return {
    [CALL_API]: {
      types: [types.PROJECT_REQUEST, types.PROJECT_SUCCESS, types.PROJECT_FAILURE],
      endpoint: `projects?filter[slug]=${slug}`,
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
    return dispatch(pledgeProjectRequest(id, amount));
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

export function loadMore() {
  (dispatch, getState) => {
    dispatch({type: types.SEARCH_LOAD_MORE});
    dispatch(getProjectBySlug())
  }
}
