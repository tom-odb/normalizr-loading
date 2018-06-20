import { createSelector } from '../../../store/utils/selector';

import { hero } from '../schemas';

export const heroesList = createSelector({
  entity: {
    schema: hero,
    path: ['heroes', 'list'],
  },
  progress: true,
});

export const heroesListPagination = createSelector({
  path: 'heroes.list.pagination',
});

export const heroesListLoading = createSelector({
  path: 'heroes.list.loading',
});

export const heroesListError = createSelector({
  path: 'heroes.list.error',
});
