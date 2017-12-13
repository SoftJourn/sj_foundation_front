import * as types from '../ActionTypes';

export function nextFormTab(formData) {
  return {type: types.NEXT_FORM_TAB, formData};
}