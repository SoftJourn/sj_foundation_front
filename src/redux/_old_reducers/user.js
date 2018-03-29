import * as types from '../../ActionTypes';

const initialData = {
  // loggedIn: window.wpApiSettings.user.ID ? true : false,
  balance: 0,
  transactions: {},
  // data: window.wpApiSettings.user,
  isAdmin: false,
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
        isAdmin: action.response.data.isAdmin,
      });
    case types.TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        transactions: action.response.data,
      });
    case types.USER_SUCCESS:
      return Object.assign({}, state, {
        data: action.response.data,
      });
  }
  return state;
}