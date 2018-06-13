import * as ACTIONS from './action-types';
import { progressReducer } from '../utils';

const reducer = (
  state = [],
  action
) => {
  if (action.type === ACTIONS.LOAD) {
    return [...action.comments];
  }

  return state;
};

export const commentsReducer = progressReducer({
  type: ACTIONS.COMMENTS_TYPE,
}, reducer);
