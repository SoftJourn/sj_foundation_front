import { LOGIN_SUCCESS } from 'ActionTypes';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user? { user } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user: action.user,
                isLoggedIn: true
            };
        default:
            return state
    }
}
