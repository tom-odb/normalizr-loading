import { createSelector } from '../../../store/utils/selector';

import { hero } from '../schemas';

export const heroesDetail = createSelector({
  entity: {
    schema: hero,
    prop: 'detail',
  },
  progress: true,
});

export const heroesDetailLoading = createSelector({
  path: 'detail.loading'
});

export const heroesDetailError = createSelector({
  path: 'detail.error'
});

export const heroesDetailMeta = createSelector({
  prop: 'detail',
});
