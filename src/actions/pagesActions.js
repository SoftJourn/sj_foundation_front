import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


/**
 * how it works
 * @returns {{}}
 */
export function getHowItWorksPage() {
  return {
    [CALL_API]: {
      types: [types.HOWITWORKS_PAGE_REQUEST, types.HOWITWORKS_PAGE_SUCCESS, types.HOWITWORKS_PAGE_FAILURE],
      endpoint: `pages?filter[name]=how-it-works`,
    },
  };
}