import * as types from '../ActionTypes';

export default function toggleModal(show) {
  (dispatch) => {
    return dispatch({type: types.MODAL_TOGGLE, show});
  }
}