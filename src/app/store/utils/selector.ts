import { path as getPath, equals, type, pathOr, propOr, toString } from 'ramda';
import { denormalize, Schema } from 'normalizr';

export const parseToString = (str) => {
  return type(str) === 'String' ? str : toString(str);
};

export const verifyValue = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  return value;
};

/**
 * creates a prop selector
 * handles progress state
 */
export const createPropSelector = (prop, { progress = false } = {}) => {
  const selector = parseToString(prop);

  return progress ? createPathSelector([selector, 'result']) : selector;
};

/**
 * creates a path selector
 * handles progress state
 */
export const createPathSelector = (path, { progress = false } = {}) => {
  const selector = Array.isArray(path) ? path : parseToString(path).split('.');

  return progress ? createPathSelector([...selector, 'result']) : selector;
};

/**
 * creates a denormalized entity selector
 * memoizes last state
 * denormalizes state with normalizr
 */
export const createDenormalizedEntitySelector = ({
  path,
  prop,
  schema,
}: {
  path?: string | string[];
  prop?: string;
  schema?: Schema;
}, options?) => {
  let lastValue = null;
  let denormalizedValue = null;
  const selector = createPathSelector(prop || path, options);
  const key = (schema as any)._key;

  return (state) => {
    const currentValue = getPath(selector, state);

    if (equals(currentValue, lastValue)) {
      return denormalizedValue;
    }

    lastValue = currentValue;

    if (!verifyValue(lastValue)) {
      denormalizedValue = null;
      return null;
    }

    const isArray = Array.isArray(lastValue);
    const denormalized = denormalize(
      {
        [key]: (isArray ? lastValue : [lastValue])
      },
      {
        [key]: [schema],
      } as any, // override weird normalizr typings
      state.entities
    );

    denormalizedValue = isArray ? denormalized[key] : (denormalized.hasOwnProperty(key) ? verifyValue(denormalized[key][0]) : null);

    return denormalizedValue;
  };
};

/**
 * creates a noop selector
 */
export const noopSelector = (state) => state;

/**
 * creates a selector
 * will create a prop, path or denormalized selector based on provided config
 */
export const createSelector = ({
  path,
  prop,
  entity,
  progress,
}: {
  path?: string | string[];
  prop?: string;
  entity?: any;
  progress?: boolean;
}) => {
  if (entity) {
    return createDenormalizedEntitySelector(entity, { progress });
  }

  if (prop) {
    return createPropSelector(prop, { progress });
  }

  if (path) {
    return createPathSelector(path, { progress });
  }

  return noopSelector;
};

/**
 * combines selectors
 * adds entry point to prop and path selectors
 * preselects state for denormalized selectors
 */
export const combineSelectors = (selectors, { entry = '' } = {}) => {
  if (!entry) {
    return selectors;
  }

  return Object.keys(selectors).reduce((combined, selector) => ({
    ...combined,
    [selector]: getCombinedSelector(selectors[selector], entry),
  }), {});
};

export const getCombinedSelector = (selector, base) => {
  switch (type(selector)) {
    case 'String':
      return createPathSelector([base, selector]);
    case 'Array':
      return createPathSelector([base, ...selector]);
    case 'Function':
      // get selector for entry point
      const entrySelector = createSelector({
        [Array.isArray(base) ? 'path' : 'prop']: base,
      });

      return (state) => {
        // select state for entry point
        const entryState = Array.isArray(entrySelector) ? pathOr(null, entrySelector, state) : propOr(null, entrySelector, state);

        // add on entities for denormalizing
        return selector({
          ...entryState,
          entities: state.entities,
        });
      };
    case 'Object':
      // recursively create selectors
      return combineSelectors(selector, { entry: base });
    default:
      return selector;
  }
};
