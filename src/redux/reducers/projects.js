import * as types from '../../ActionTypes';
import rename from 'rename-keys';

const initialData = {
  data: {},
  categories: [],
  isFetching: false,
  error: false,
  page: 1,
  pages: 1,
};

export default function projects(state = initialData, action) {
  switch(action.type) {
    case types.SEARCH_INIT:
      return Object.assign({}, state, {
        page: 1,
        pages: 1,
        data: [],
      });
    case types.SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.SEARCH_SUCCESS:
      //change data keynames
      const response = rename(action.response.data, (str) => {return `${state.page}${str}`});
      let data = Object.assign({}, state.data, {...response});
      return Object.assign({}, state, {
        data,
        pages: action.response.meta.pages,
        isFetching: false,
      });
    case types.SEARCH_LOAD_MORE:
      return Object.assign({}, state, {
        page: state.page+1,
      });
    case types.CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: action.response.data
      });
  }
  return state;
}
