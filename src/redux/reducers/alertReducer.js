import { ALERT_ERROR, ALERT_CLEAR, ALERT_SUCCESS } from 'ActionTypes';

export default function alert(state = {}, action) {
    switch (action.type) {
        case ALERT_ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            }
        case ALERT_CLEAR:
            return { };
        case ALERT_SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            }
        default:
            return state
    }
}
