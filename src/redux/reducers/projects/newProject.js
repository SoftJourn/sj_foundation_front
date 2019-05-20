import { NEW_PROJECT_STEP_1 } from 'ActionTypes'

const initialData = {};

export default function newProject (state = initialData, action) {
    switch (action.type) {
        case NEW_PROJECT_STEP_1:
            return {
                title: action.title
            };
        default:
            return state;
    }
}
