import { createSelector } from '../utils/selector';

import { hero } from './schemas';

export const heroesList = createSelector({
  entity: {
    schema: hero,
    prop: 'heroes',
  },
  progress: true,
});

export const heroesLoading = createSelector({
  path: 'heroes.loading',
});
