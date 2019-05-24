import { NEW_PROJECT_STEP_1, NEW_PROJECT_STEP_2, NEW_PROJECT_STEP_3  } from 'ActionTypes'

const initialData = {};

export default function newProject (state = initialData, action) {
    switch (action.type) {
        case NEW_PROJECT_STEP_1:
            return {
                ...state,
                title: action.title
            };
        case NEW_PROJECT_STEP_2:
            return {
                ...state,
                category: action.category
            }
        case NEW_PROJECT_STEP_3:
            return {
                ...state,
                description: action.description
            }
        default:
            return state;
    }
}
