import {
    NEW_PROJECT_STEP_1,
    NEW_PROJECT_STEP_2,
    NEW_PROJECT_STEP_3,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS
} from 'ActionTypes'

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
                description: action.description,
                projectImage: action.image,
                projectVideo: action.video,
                projectAttachments: action.attachments
            }
        case PROJECT_CREATE_REQUEST:
            return {
                ...state,
                price: action.price,
                canDonate: action.canDonate,
                due: action.due
            }
        case PROJECT_CREATE_SUCCESS:
            return initialData;
        default:
            return state;
    }
}
