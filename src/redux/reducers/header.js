import * as types from '../../ActionTypes';

export default function headerVisibility(state = [], action) {
    switch(action.type) {
        case types.TOGGLE_HEADER:
            if (state.visibleHeader == action.visibleHeader) {
                return state;
            }
            return {
                ...state,
                visibleHeader: action.visibleHeader
            };
        default:
            return state;
    }
}
