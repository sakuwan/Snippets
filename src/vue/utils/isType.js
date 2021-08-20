export const isDefined = (x) => x !== null && x !== undefined;
export const isNullish = (x) => x === null || x === undefined;

export const { isArray } = Array;
export const isObject = (x) => (
  x !== null && !isArray(x) && typeof x === 'object'
);

export const isString = (x) => typeof x === 'string';
export const isNumber = (x) => typeof x === 'number';
export const isSymbol = (x) => typeof x === 'symbol';
export const isBoolean = (x) => typeof x === 'boolean';
export const isFunction = (x) => typeof x === 'function';

export const isElement = (x) => (
  isObject(x) && isDefined(x.tagName) && isString(x.tagName)
);
