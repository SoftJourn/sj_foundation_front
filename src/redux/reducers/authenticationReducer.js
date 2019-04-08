import { LOGIN_SUCCESS, LOGOUT } from 'ActionTypes';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user? { user } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user: action.user,
                isLoggedIn: true
            };
        case LOGOUT:
            return {
                user: {},
                isLoggedIn: false
            };
        default:
            return state
    }
}
