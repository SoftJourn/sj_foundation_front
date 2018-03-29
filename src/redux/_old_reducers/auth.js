import * as types from '../../ActionTypes';

const initialData = {
  isFetching: false,
  token: {},
};

export default function auth(state = initialData, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      window.localStorage.setItem('token', action.response.data.token.id);
      return Object.assign({}, state, {token: action.response.data.token});
  }
  return state;
}