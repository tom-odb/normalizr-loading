import { progressReducer, paginationReducer } from '../../../store/utils';

import { HEROES_LIST_ACTIONS as ACTIONS, TYPE } from './action-types';

const reducer = (
  state = [],
  action
) => {
  if (action.type === ACTIONS.FETCH_ALL) {
    return [...action.heroes];
  }

  return state;
};

// export const heroesReducer = ;
export const heroesListReducer = paginationReducer(
  progressReducer({
      type: TYPE,
    },
    reducer
  )
);
