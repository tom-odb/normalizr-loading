import { progressReducer } from '../../../store/utils';

import { HEROES_DETAIL_ACTIONS as ACTIONS, TYPE } from './action-types';

const reducer = (
  state = null,
  action
) => {
  if (action.type === ACTIONS.FETCH) {
    return action.hero;
  }

  if (action.type === ACTIONS.CLEAR) {
    return null;
  }

  return state;
};

export const heroesDetailReducer = progressReducer({
  type: TYPE,
}, reducer);
