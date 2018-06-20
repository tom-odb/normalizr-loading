import { propOr } from 'ramda';

import {
  ProgressState,
  ProgressAction,
  ProgressReducer,
  ProgressOptions,
} from '../store.types';

const getResultState = <T = any>(
  state: ProgressState<T>,
  action: ProgressAction,
  reducer: ProgressReducer<T>,
  shouldUpdate?: boolean,
): T => {
  const currentState = propOr<T>(null, 'result', state);

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
  const [ entity, actions, response ] = action.type.split('/');

  if (entity === type) {

    if (response === 'START') {
      return Object.assign({}, state, { loading: true, startFetching: Date.now() });
    }

    if (response === 'SUCCESS') {
      return Object.assign({}, state, {
        loading: false,
        error: null,
        result: reducer(state, {
          ...action,
          type: `${entity}/${actions}`,
        }),
        lastUpdated: Date.now(),
      });
    }

    if (response === 'ERROR') {
      return Object.assign({}, state, {
        loading: false,
        error: action.message,
        result: null,
        lastUpdated: Date.now(),
      });
    }

    if (response === 'DONE') {
      return Object.assign({}, state, {
        loading: false,
      });
    }
  }

  return state;
};
