import * as ACTIONS from './action-types';
import { progressReducer } from '../utils';

const reducer = (
  state = [],
  action
) => {
  if (action.type === ACTIONS.LOAD) {
    return [...action.users];
  }

  return state;
};

export const usersReducer = progressReducer({
  type: ACTIONS.USERS_TYPE,
}, reducer);
