import { ALERT_ERROR, ALERT_CLEAR } from '../ActionTypes'

export const alertActions = {
    error,
    clear
}

function error(message) {
    return { type: ALERT_ERROR, message };
}

function clear() {
    return { type: ALERT_CLEAR };
}
