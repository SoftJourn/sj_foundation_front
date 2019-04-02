import { userService } from '../services'
import { alertActions } from './alertActions'
import { LOGIN_SUCCESS } from '../ActionTypes'

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function success(user) { return { type: LOGIN_SUCCESS, user, isLoggedIn: true } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
