import { CALL_API } from '../redux/middleware/api';
import { AUTH_LOGOUT, AUTH_SET_USER, AUTH_SUCCESS, AUTH_FAILURE, AUTH_REQUEST } from '../ActionTypes'


export function authLogout(){
  return {
    type: AUTH_LOGOUT
  }
}

export function authSetUser(user){
  return {
    type: AUTH_SET_USER,
    user
  }
}


export function auth(username, password) {
  return {
    [CALL_API]: {
      types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
      method: 'POST',
      endpoint: `api/login`,
      body: {
        username,
        password,
      },

    },
  };
}