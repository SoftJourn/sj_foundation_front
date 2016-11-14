import * as types from '../../ActionTypes';

const initialData = {
  loggedIn: true,
  balance: 0,
  transactions: {},
};

export default function user(state = initialData, action) {
  switch(action.type) {
    case types.AUTH_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    case types.USER_BALANCE_SUCCESS:
      return Object.assign({}, state, {
        balance: action.response.data.amount,
      });
    case types.TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        transactions: action.response.data,
      });
  }
  return state;
}