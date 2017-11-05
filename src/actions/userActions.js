import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


/**
 * get user data
 * @returns {{}}
 */
export function getUser(id) {
  return {
    [CALL_API]: {
      types: [types.USER_REQUEST, types.USER_SUCCESS, types.USER_FAILURE],
      endpoint: `users/${id}`,
    },
  };
}


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

/**
 * get balance
 * @returns {{}}
 */
export function getTransactions(id) {
  return {
    [CALL_API]: {
      types: [types.TRANSACTIONS_REQUEST, types.TRANSACTIONS_SUCCESS, types.TRANSACTIONS_FAILURE],
      endpoint: `get_transactions`,
    },
  };
}

/**
 * get balance
 * @returns {{}}
 */
export function checkUser() {
  return {
    [CALL_API]: {
      types: ['user', 'userDone', 'userFail'],
      endpoint: `api/accounts/me`,
    },
  };
}