import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


export function createComment(postId, content) {
  return {
    [CALL_API]: {
      method: 'POST',
      types: [types.COMMENT_POST_REQUEST, types.COMMENT_POST_SUCCESS, types.COMMENT_POST_FAILURE],
      endpoint: `comments?post=${postId}&content=${content}`,
    },
  };
}

export function fetchComments(postId) {
  return {
    [CALL_API]: {
      types: [types.COMMENT_REQUEST, types.COMMENT_SUCCESS, types.COMMENT_FAILURE],
      endpoint: `comments?per_page=100&post=${postId}`,
    },
  };
}
