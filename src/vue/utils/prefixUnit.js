// eslint-disable-next-line import/prefer-default-export
export const prefixUnit = (value, unit = 'px') => (
  (value === null || value === undefined || value === '')
    ? undefined
    : `${Number(value)}${unit}}`
);
