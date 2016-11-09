import * as types from '../../ActionTypes';
import _ from 'lodash';

const initialData = {
  data: [],
  isFetching: true,
  error: false,
  showModal: false,
  pledgeIsFetching: false,
  pledgeError: false,
  pledgeSuccess: false,
  backers: 0,
  pledgeSum: 0,
};

export default function project(state = initialData, action) {
  switch(action.type) {
    case types.PROJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        showModal: false,
        pledgeIsFetching: false,
        pledgeError: false,
        pledgeSuccess: false,
        bakers: 0,
      });
    case types.PROJECT_SUCCESS:
      return Object.assign({}, state, {
        data: action.response[0],
        isFetching: false,
        backers: getBackersCount(action.response[0]['transactions']),
        pledgeSum: getPledgeSum(action.response[0]['transactions'])
      });
    case types.PLEDGE_SUCCESS:
      return Object.assign({}, state, {
        pledgeSuccess: true,
        pledgeError: false,
      });
    case types.PLEDGE_FAILURE:
      return Object.assign({}, state, {
        pledgeSuccess: false,
        pledgeError: true,
      });
    case types.SHOW_PLEDGE_MODAL:
      return Object.assign({}, state, {
        showModal: true,
      });
  }
  return state;
}

function getPledgeSum(transactions) {
  return _.sumBy(transactions, 'amount');
}

function getBackersCount(transactions) {
  var result = _.uniqBy(transactions, 'accountId');
  return result.length;
}