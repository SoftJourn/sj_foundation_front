import { CALL_API } from '../../redux/middleware/api';
import * as types from '../../ActionTypes';


/**
 * fetches projects
 * @param page
 * @returns {{}}
 */
function fetchSearch(page = 1, category = '') {
  return {
    [CALL_API]: {
      types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
      endpoint: `projects?per_page=9&page=${page}&filter[category_name]=${category}`,
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

