import { TOGGLE_HEADER } from '../ActionTypes'

export const headerActions = {
    show,
    toggle
}

function toggle(isVisible) {
    return {
        type: TOGGLE_HEADER,
        visibleHeader: isVisible
    }
}

function show() {
    return {
        type: TOGGLE_HEADER,
        visibleHeader: true
    }
}
