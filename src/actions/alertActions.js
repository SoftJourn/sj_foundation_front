import { ALERT_ERROR, ALERT_CLEAR, ALERT_SUCCESS } from '../ActionTypes'

export const alertActions = {
    error,
    clear,
    success
}

function error(message) {
    return { type: ALERT_ERROR, message };
}

function clear() {
    return { type: ALERT_CLEAR };
}

function success(message) {
    return { type: ALERT_SUCCESS, message };
}
