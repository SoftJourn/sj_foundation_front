import { CALL_API } from '../../redux/middleware/api';
import * as types from '../../ActionTypes';


/**
 * fetches projects
 * @param params
 * @returns {{}}
 */
function fetchSearch(params = '') {
  return {
    [CALL_API]: {
      types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
      endpoint: `projects/${params}`,
    },
  };
}

/**
 * change url and dispatch search action
 */
export function getProjects() {
  return (dispatch) => {
    return dispatch(fetchSearch());
  };
}
