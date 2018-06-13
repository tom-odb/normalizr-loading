import { propOr } from 'ramda';

import {
  ProgressState,
  ProgressAction,
  ProgressReducer,
  ProgressOptions,
} from "../store.types";

const getResultState = <T = any>(
  state: ProgressState<T>,
  action: ProgressAction,
  reducer: ProgressReducer<T>,
  shouldUpdate?: boolean,
): T => {
  const currentState = propOr(null, 'result', state);

  if (!shouldUpdate) {
    return currentState;
  }

  if (action.loading || action.error) {
    return null;
  }

  return reducer(currentState, action);
};

export const progressReducer = <T = any>({ type }: ProgressOptions, reducer: ProgressReducer) => (
  state: ProgressState<T> = null,
  action: ProgressAction
): ProgressState<T> => {
  const shouldUpdate = action.type.split('/')[0] === type;

  return {
    loading: shouldUpdate ? propOr(false, 'loading', action) : propOr(false, 'loading', state),
    error: shouldUpdate ? propOr(null, 'error', action) : propOr(null, 'error', state),
    createdDate: shouldUpdate ? propOr(Date.now(), 'createdDate', state) : propOr(null, 'createdDate', state),
    lastUpdated: shouldUpdate ? Date.now() : propOr(null, 'lastUpdated', state),
    result: getResultState(state, action, reducer, shouldUpdate),
  };
};
