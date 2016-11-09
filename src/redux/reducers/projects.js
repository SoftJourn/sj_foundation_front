import * as types from '../../ActionTypes';

const initialData = {
  data: [],
  isFetching: false,
  error: false,
};

export default function projects(state = initialData, action) {
  switch(action.type) {
    case types.SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        data: action.response,
        isFetching: false,
      });
  }
  return state;
}