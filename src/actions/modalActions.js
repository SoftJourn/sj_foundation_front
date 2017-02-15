import * as types from '../ActionTypes';

export default function toggleModal(show) {
  return (dispatch) => {
    return dispatch({type: types.MODAL_TOGGLE, show});
  }
}