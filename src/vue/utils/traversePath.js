import { unref } from 'vue';

import { isNullish } from './isNullish';

export const traversePath = (obj, path, fallback = null) => {
  if (isNullish(obj) || isNullish(path)) return isNullish(obj) ? fallback : obj;

  const pathLength = path.length ?? 0;
  if (pathLength === 0) return obj;

  let nestedValue = obj;
  for (let i = 0; i < pathLength; i += 1) {
    const pathValue = path[i];

    nestedValue = nestedValue[pathValue];
    if (isNullish(nestedValue)) return fallback;
  }

  return nestedValue;
};

export const traverseRefPath = (obj, path, fallback = null) => (
  isNullish(path)
    ? traversePath(obj, null, fallback)
    : traversePath(unref(obj), path.map((value) => unref(value)), fallback)
);
