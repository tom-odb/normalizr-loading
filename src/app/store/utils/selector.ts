import { path as getPath, equals, type, pathOr, propOr } from 'ramda';
import { denormalize } from 'normalizr';

export const createPropSelector = (prop, { progress = false } = {}) => {
  const selector = prop.toString();

  return progress ? createPathSelector([selector, 'result']) : selector;
};

export const createPathSelector = (path, { progress = false } = {}) => {
  const selector = Array.isArray(path) ? path : path.toString().split('.');

  return progress ? createPathSelector([...selector, 'result']) : selector;
};

export const createDenormalizedEntitySelector = ({
  path,
  prop,
  schema,
}, options) => {
  let lastValue = null;
  let denormalizedValue = null;
  const selector = createPathSelector(prop || path, options);

  return (state) => {
    const currentValue = getPath(selector, state);

    if (equals(currentValue, lastValue)) {
      return denormalizedValue;
    }

    lastValue = currentValue;

    if (!lastValue) {
      denormalizedValue = null;
      return null;
    }

    const isArray = Array.isArray(lastValue);
    const denormalized = denormalize(isArray ? lastValue : [lastValue], [schema], state.entities);

    denormalizedValue = isArray ? denormalized : (denormalized.length ? denormalized[0] : null);

    return denormalizedValue;
  };
};

export const noopSelector = (state) => state;

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

export const combineSelectors = (selectors, { entry = '' } = {}) => {
  if (!entry) {
    return selectors;
  }

  return Object.keys(selectors).reduce((combined, selector) => ({
    ...combined,
    [selector]: getCombinedSelector(selectors[selector], entry),
  }), {});
};

const getCombinedSelector = (selector, base) => {
  switch (type(selector)) {
    case 'String':
      return createPathSelector([base, selector]);
    case 'Array':
      return createPathSelector([base, ...selector]);
    case 'Function':
      const entrySelector = createSelector({
        [Array.isArray(base) ? 'path' : 'prop']: base,
      });

      return (state) => {
        const entryState = Array.isArray(entrySelector) ? pathOr(null, entrySelector, state) : propOr(null, entrySelector, state);

        return selector({
          ...entryState,
          entities: state.entities,
        });
      };
    case 'Object':
      return combineSelectors(selector, { entry: base });
    default:
      return selector;
  }
};
