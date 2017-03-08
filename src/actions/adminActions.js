import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';

export function fetchAdminStats() {
  return {
    [CALL_API]: {
      types: [types.ADMIN_STATS_REQUEST, types.ADMIN_STATS_SUCCESS, types.ADMIN_STATS_FAILURE],
      endpoint: `get_admin_stats`,
    },
  };
}
