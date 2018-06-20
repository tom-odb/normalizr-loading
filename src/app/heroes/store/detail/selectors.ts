import { createSelector } from "../../../store/utils/selector";

import { hero } from "../schemas";

export const heroesDetail = createSelector({
  entity: {
    schema: hero,
    path: ['heroes', 'detail'],
  },
  progress: true,
});

export const heroesDetailLoading = createSelector({
  path: 'heroes.detail.loading'
});

export const heroesDetailError = createSelector({
  path: 'heroes.detail.error'
});
