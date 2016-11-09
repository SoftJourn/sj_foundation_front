import * as types from '../../ActionTypes';

const initialData = {
  loggedIn: true,
};

export default function user(state = initialData, action) {
  switch(action.type) {
    case types.AUTH_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
  }
  return state;
}