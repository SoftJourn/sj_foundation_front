import * as types from '../../ActionTypes';

const initialData = {
  data: {},
  isFetching: false,
  error: false,
  stats: {},
};

export default function projects(state = initialData, action) {
  switch (action.type) {
    case types.ADMIN_STATS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.ADMIN_STATS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        stats: action.response.data.data,
      });
  }
  return state;
}
