import { PROJECT_INIT, PROJECT_REQUEST, PROJECT_SUCCESS } from 'ActionTypes';

const initialData = {
  data: [],
  isFetching: true,
  error: false
};

export default function project(state = initialData, action) {
    switch (action.type) {
        case PROJECT_INIT:
            return {
                data: [],
                isFetching: true,
                error: false
            };
        case PROJECT_REQUEST:
            return {
                isFetching: true,
                error: false
            }
        case PROJECT_SUCCESS:
            if (!action.response.data) {
                return {
                    error: true,
                    isFetching: false
                }
            }

            return {
                data: action.response.data,
                isFetching: false
            }
        default:
            return state;
    }
}
