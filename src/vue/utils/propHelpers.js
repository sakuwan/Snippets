import { isObject, isArray, isDefined } from './isType';

export const complexPropFactory = (props) => (
  (defaults) => {
    const buildTypes = (acc, prop) => {
      const propDefinition = isObject(props[prop])
        ? props[prop]
        : { type: props[prop] };

      return {
        ...acc,
        [prop]: {
          ...((isDefined(defaults) && prop in defaults)
            ? { ...propDefinition, default: defaults[prop] }
            : propDefinition
          ),
        },
      };
    };

    return Object.keys(props).reduce(buildTypes, {});
  }
);

export const makeSingleTypedProps = (props) => {
  const createEmptyObject = (v) => (isObject(v) ? () => ({}) : () => []);
  const buildTypes = (acc, prop) => ({
    ...acc,
    [prop]: {
      type: props[prop]?.constructor,
      default: (isObject(props[prop]) || isArray(props[prop]))
        ? createEmptyObject(props[prop])
        : props[prop],
    },
  });

  return Object.keys(props).reduce(buildTypes, {});
};

export const makeClassProps = (props) => {
  const buildTypes = (acc, prop) => ({
    ...acc,
    [prop]: {
      type: [Object, Array, String],
      default: props[prop],
    },
  });

  return Object.keys(props).reduce(buildTypes, {});
};
