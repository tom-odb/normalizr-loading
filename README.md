# Loading and stuff

## Table of Contents

1. [Store Utils](#utils)
2. [Components](#components)

---

## [Store Utils](#utils)

### Progress HOR

Wrap around existing reducers to get loading/error state:

```javascript
const myReducer = (state, action) => {
  if (action.type === 'THINGS/DO_STUFF') {
    return action.things;
  }

  return state;
};

const myProgressReducer = progressReducer({ type: 'THINGS' }, myReducer);
```

returns progress wrapped state:

```javascript
{
  loading: true/false,
  error: 'this failed',
  startFetching: 1528905229476,
  lastUpdated: 1528905229123,
  result: {...}
}
```

* when `loading` is `true`, `error` and `result` will be `null`
* when `error` is `true`, `loading` will be false and `result` will be `null`
* `result` contains the value returned by the provided reducer

### [Selectors](#selectors)

Quickly create redux selectors, supports [normalizr](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#normalizedata-schema) entity setup.

[**createPropSelector**](#propselector)

```javascript
createPropSelector(prop, { progress })
```

* returns prop selector (i.e. a string)
* will return path selector for progress wrapped state when `progress` is `true`

[**createPathSelector**](#pathselector)

```javascript
createPathSelector(path, { progress })
```

* returns path selector (i.e. an array of strings)
* will return path selector for progress wrapped state when `progress` is `true`
* if `path` is a string representation, it will be split by dot notation to create a path

[**createDenormalizedEntitySelector**](#entityselector)

```javascript
createDenormalizedEntitySelector(path, prop, schema, { progress })
```

* returns selector method that returns denormalized data
* assumes `entities` in the store
* expects a valid `schema`
* will map requested entity to `schema._key`
* executes equality checks on requested data to avoid unnecessary updates
* will take progress wrapped state into account if `progress` is `true`

**createSelector**

```javascript
createSelector({
  path,
  prop,
  entity: {
    path,
    prop,
    schema,
  },
  progress
})
```

* one of `path`, `prop`, `entity` is required
* will create [path selector](#pathselector) when `path` is set
* will create [prop selector](#propselector) when `prop` is set
* will create [entity selector](#entityselector) when `entity` is set
* will take progress wrapped state into account if `progress` is `true`

#### Examples

```javascript
// 1. Define a schema
import { schema } from 'normalizr';

const user = new schema.Entity('users');

// 2. Create a selector for your schema
export const usersList = createSelector({
  entity: {
    schema: user,
    prop: 'users',
  },
  progress: true,
});

// 3. Create a loading selector for your schema
export const usersLoading = createSelector({
  path: 'users.loading',
});

// 4. Create a schema using the previously defined schema
const comment = new schema.Entity('comments', {
  user,
});

// 5. Create a selector for the schema, nested users will be populated
export const commentsList = createSelector({
  entity: {
    schema: comment,
    prop: 'comments',
  },
  progress: true,
});

```

## [Components](#components)

### Loading Component

Render loading state while data is being fetched.

```html
<loading [selector]="loadingSelector">
  <p>Done loading</p>
</loading>
```

* `selector` should be a valid [selector](#selectors)
* projected content will only be rendered when selected data results to `false`
