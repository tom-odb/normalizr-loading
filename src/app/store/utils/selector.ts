import { path as getPath, equals } from 'ramda';
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
      return null;
    }

    denormalizedValue = denormalize(lastValue, [schema], state.entities);

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
