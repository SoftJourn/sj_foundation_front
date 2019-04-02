import { TOGGLE_HEADER } from '../../ActionTypes';

export default function headerVisibility(state = [], action) {
    switch(action.type) {
        case TOGGLE_HEADER:
            return {
                ...state,
                visibleHeader: action.visibleHeader
            };
        default:
            return state;
    }
}
