import first from 'lodash/first';

export const findInObject = (obj, key) => first(
  Object.entries(obj)
    .filter(([_key]) => _key === key)
    .map(([, value]) => value)
);
