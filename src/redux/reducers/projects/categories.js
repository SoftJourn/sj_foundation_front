import * as types from '../../../ActionTypes';

const initialData = [];

export default function user (state = initialData, action) {
    switch(action.type) {
        
        case types.CATEGORIES_SUCCESS :
            return action.response.data;
            
        default:
            return state;
    }
}