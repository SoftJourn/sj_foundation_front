import { CALL_API } from '../redux/middleware/api';
import * as types from '../ActionTypes';


export function setCoinsToAll(amount) {
  return {
    [CALL_API]: {
      method: 'GET',
      types: ['setCoinsToAll', 'setCoinsToAll', 'setCoinsToAll'],
      endpoint: `setCoinsToAll?amount=${amount}`,
    },
  };
}