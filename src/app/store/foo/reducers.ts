import { progressReducer } from "../utils/progress";

import * as ACTIONS from './action-types';

const reducer = (
  state = null,
  { type, foo }
) => {
  if (type === ACTIONS.SET) {
    return foo;
  }

  return state;
};

export const fooReducer = progressReducer({ type: ACTIONS.FOO_TYPE }, reducer);
