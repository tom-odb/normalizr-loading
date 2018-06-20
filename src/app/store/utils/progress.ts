import { propOr } from 'ramda';

import {
  ProgressState,
  ProgressAction,
  ProgressReducer,
  ProgressOptions,
} from '../store.types';
import { NG_PROJECT_AS_ATTR_NAME } from '@angular/core/src/render3/interfaces/projection';

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
        result: reducer(state, action),
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

    // if (response === 'START') {
    //   // return {
    //   //   ...state,
    //   //   loading: shouldUpdate ? propOr(false, 'loading', action) : propOr(false, 'loading', state),
    //   //   error: shouldUpdate ? propOr(null, 'error', action) : propOr(null, 'error', state),
    //   //   createdDate: shouldUpdate ? propOr(Date.now(), 'createdDate', state) : propOr(null, 'createdDate', state),
    //   //   lastUpdated: shouldUpdate ? Date.now() : propOr(null, 'lastUpdated', state),
    //   //   result: getResultState(state, action, reducer, shouldUpdate),
    //   // };
    // }
  }

  return state;
};
