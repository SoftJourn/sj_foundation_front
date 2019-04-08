import { userService } from 'services'
import { alertActions } from './alertActions'
import { LOGIN_SUCCESS, LOGOUT } from 'ActionTypes'

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                user => {
                    dispatch({ type: LOGIN_SUCCESS, user, isLoggedIn: true });
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}
