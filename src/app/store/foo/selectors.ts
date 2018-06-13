import { createSelector } from '../utils/selector';

export const fooLoading = createSelector({
  path: ['foo', 'loading'],
});

export const fooResult = createSelector({
  path: ['foo', 'result'],
});
