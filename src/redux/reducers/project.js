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
  pledgeSuccessSum: false,
  comments:[],
  backers: 0,
  pledgeSum: 0,
  commentSuccess: false,
  newCommentId: 0,
  accountPledgeSum: 0,
};

export default function project(state = initialData, action) {
  switch(action.type) {
    case types.PROJECT_INIT:
      return Object.assign({}, state, {
        data: [],
        isFetching: true,
        error: false,
        showModal: false,
        pledgeIsFetching: false,
        pledgeError: false,
        pledgeSuccess: false,
        pledgeSuccessSum: false,
        comments:[],
        backers: 0,
        pledgeSum: 0,
        commentSuccess: false,
        newCommentId: 0,
        accountPledgeSum: 0,
      });
    case types.PROJECT_REQUEST:
    case types.PROJECT_PREVIEW_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        showModal: false,
        pledgeIsFetching: false,
        bakers: 0,
        comments:[],
        backers: 0,
        pledgeSum: 0,
        commentSuccess: false,
        newCommentId: 0,
      });
    case types.PROJECT_SUCCESS:
    case types.PROJECT_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        data: action.response.data,
        isFetching: false,
      });
    case types.PROJECT_FAILURE:
      return Object.assign({}, state, {
        data: [],
        isFetching: false,
        error: true,
      });
    case types.PROJECT_PREVIEW_SUCCESS:
      return Object.assign({}, state, {
        data: action.response.data,
        isFetching: false,
        backers: 0,
        pledgeSum: 0,
        accountPledgeSum: 0,
      });
    case types.PLEDGE_SUCCESS:
      if (action.response.data.status === 'success') {
        return Object.assign({}, state, {
          pledgeSuccess: true,
          pledgeError: false,
          pledgeSuccessSum: action.response.data.amount,
        });
      } else {
        return Object.assign({}, state, {
          pledgeSuccess: false,
          pledgeError: true,
          pledgeMessage: action.response.data.message
        });
      }
    case types.PLEDGE_FAILURE:
      return Object.assign({}, state, {
        pledgeSuccess: false,
        pledgeError: true,
      });
    case types.SHOW_PLEDGE_MODAL:
      return Object.assign({}, state, {
        showModal: true,
      });
    case types.COMMENT_SUCCESS:
      return Object.assign({}, state, {
        comments: action.response.data,
      });
    case types.COMMENT_POST_SUCCESS:
      return Object.assign({}, state, {
        commentSuccess: true,
        newCommentId: action.response.data.id,
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