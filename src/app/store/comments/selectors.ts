import { createSelector } from '../utils/selector';

import { comment } from './schemas';

export const commentsList = createSelector({
  entity: {
    schema: comment,
    prop: 'comments',
  },
  progress: true,
});

export const commentsLoading = createSelector({
  path: ['comments', 'loading'],
});
