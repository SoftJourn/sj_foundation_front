import * as types from '../../ActionTypes';

const initialData = {
  data: []
};

export default function donation(state = initialData, action) {
  let donations = state.data;
  switch (action.type) {
    case types.PLEDGE_REQUEST:
      donations.push({
        donationSuccess: false,
        donationRequest: true,
        donationError: false,
        donationId: action.project_id,
        donationAmount: 0,
      });
      return Object.assign({}, state, {
        data: donations,
      });
    case types.PLEDGE_SUCCESS:
      const success = action.response.data.status === 'success';
      donations.push({
        donationSuccess: success,
        donationError: !success,
        donationRequest: false,
        donationId: action.response.data.id,
        donationAmount: success ? action.response.data.amount : 0,
      });
      return Object.assign({}, state, {
        data: donations,
      });
    case types.PLEDGE_FAILURE:
      donations.push({
        donationSuccess: false,
        donationError: true,
        donationRequest: false,
        donationId: action.response.data.id,
        donationAmount: success ? action.response.data.amount : 0,
      });
      return Object.assign({}, state, {
        data: donations,
      });
  }
  return state;
}
