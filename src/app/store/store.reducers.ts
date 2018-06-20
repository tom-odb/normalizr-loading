import { fooReducer } from './foo/reducers';

import { entitiesReducer } from './entities/reducers';
import { usersReducer } from './users/reducers';
import { commentsReducer } from './comments/reducers';

export const reducers = {
  foo: fooReducer,
  entities: entitiesReducer,
  comments: commentsReducer,
  users: usersReducer,
};
