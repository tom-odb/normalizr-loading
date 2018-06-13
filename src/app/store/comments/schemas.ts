import { schema } from 'normalizr';

import { user } from '../users/schemas';

export const comment = new schema.Entity('comments', {
  user,
});
