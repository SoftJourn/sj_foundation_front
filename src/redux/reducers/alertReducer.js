import { ALERT_ERROR, ALERT_CLEAR } from 'ActionTypes';

export default function alert(state = {}, action) {
    switch (action.type) {
        case ALERT_ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            }
        case ALERT_CLEAR:
            return { };
        default:
            return state
    }
}
