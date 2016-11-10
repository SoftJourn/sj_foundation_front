import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


/**
 * get balance
 * @returns {{}}
 */
export function getBalance() {
  return {
    [CALL_API]: {
      types: [types.USER_BALANCE_REQUEST, types.USER_BALANCE_SUCCESS, types.USER_BALANCE_FAILURE],
      endpoint: `get_balance`,
    },
  };
}