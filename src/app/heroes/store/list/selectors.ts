import { createSelector } from '../../../store/utils/selector';

import { hero } from '../schemas';

export const heroesList = createSelector({
  entity: {
    schema: hero,
    prop: 'list',
  },
  progress: true,
});

export const heroesListPagination = createSelector({
  path: 'list.pagination',
});

export const heroesListLoading = createSelector({
  path: 'list.loading',
});

export const heroesListError = createSelector({
  path: 'list.error',
});

export const heroesListMeta = createSelector({
  path: 'list',
});
