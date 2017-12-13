import * as types from '../../ActionTypes';

const initialData = {
    name: '',
    title: '',
    content: '',
    shortDescription: '',
    price: '',
    status: '',
    donateMore: '',
    due: '',
    categoryId: ''
};

export default function form(state = initialData, action) {
    switch (action.type) {
        case types.NEXT_FORM_TAB:
            return Object.assign({}, state, action.formData);
    }
    return state;
}