import { ACTIONS, TYPE } from './action-types';
import { progressReducer } from '../utils';
import { paginationReducer } from '../utils';

const reducer = (
  state = [],
  action
) => {
  if (action.type === ACTIONS.FETCH_ALL_SUCCESS) {
    return [...action.heroes];
  }

  return state;
};

// export const heroesReducer = ;
export const heroesReducer = paginationReducer(
  progressReducer({
      type: TYPE,
    },
    reducer
  )
);
