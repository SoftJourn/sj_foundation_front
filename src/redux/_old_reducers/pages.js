import * as types from '../../ActionTypes';

const initialData = {
  howItWorks: [],
  isFetching: false,
};

export default function pages(state = initialData, action) {
  switch (action.type) {
    case types.HOWITWORKS_PAGE_REQUEST:
      return Object.assign({}, state, {isFetching: true});
    case types.HOWITWORKS_PAGE_SUCCESS:
      if (action.response.data.length == 0) {
        return state;
      }
      return Object.assign({}, state, {howItWorks: action.response.data[0], isFetching: false});
  }
  return state;
}