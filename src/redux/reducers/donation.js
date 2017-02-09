import * as types from '../../ActionTypes';

const initialData = {
  data: [],
  withdraw: [],
};

export default function donation(state = initialData, action) {
  let donations = state.data;
  let withdraws = state.withdraw;
  let success = false;
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
      success = action.response.data.status === 'success';
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

    case types.WITHDRAW_REQUEST:
      withdraws.push({
        success: false,
        request: true,
        error: false,
        id: action.project_id
      });
      return Object.assign({}, state, {
        withdraw: withdraws,
      });
    case types.WITHDRAW_SUCCESS:
      success = action.response.success;
      withdraws.push({
        success: success,
        error: !success,
        request: false,
        id: action.response.data.id,
      });
      return Object.assign({}, state, {
        withdraw: withdraws,
      });
    case types.WITHDRAW_FAILURE:
      withdraws.push({
        success: false,
        error: true,
        request: false,
        // id: action.response.id
      });
      return Object.assign({}, state, {
        withdraw: withdraws,
      });
  }
  return state;
}
