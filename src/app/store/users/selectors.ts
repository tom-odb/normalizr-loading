import { createSelector } from '../utils/selector';

import { user } from './schemas';

export const usersList = createSelector({
  entity: {
    schema: user,
    prop: 'users',
  },
  progress: true,
});

export const usersLoading = createSelector({
  path: 'users.loading',
});
