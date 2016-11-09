
import { AUTH_LOGOUT, AUTH_SET_USER } from '../../ActionTypes'


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