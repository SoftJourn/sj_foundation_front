import * as types from '../../ActionTypes';

const initialData = {
  data: [],
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
      return Object.assign({}, state, {
        data: action.response.data,
        // pages: action.response.data.meta.pages,
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
    case types.PROJECT_UPDATE_SUCCESS: {
      let projects = state.data;
      Object.keys(projects).map((key) => {
          if (action.response.data.id == projects[key].id) {
            projects[key] = action.response.data;
          }
      });
      return Object.assign({}, state, {
        data: projects,
      });
    }
  }
  return state;
}
