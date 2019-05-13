import { PROJECTS_SUCCESS } from 'ActionTypes';

const initialData = [];

export default function user (state = initialData, action) {
    switch(action.type) {
        case PROJECTS_SUCCESS:
            return action.response.data;

        default:
            return state;
    }
}
