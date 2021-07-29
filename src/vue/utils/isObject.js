// eslint-disable-next-line import/prefer-default-export
export const isObject = (x) => (
  x !== null && !Array.isArray(x) && typeof x === 'object'
);
