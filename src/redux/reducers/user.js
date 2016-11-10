import * as types from '../../ActionTypes';

const initialData = {
  loggedIn: true,
  balance: 0,
};

export default function user(state = initialData, action) {
  switch(action.type) {
    case types.AUTH_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    case types.USER_BALANCE_SUCCESS:
      return Object.assign({}, state, {
        balance: action.response.amount,
      });
  }
  return state;
}