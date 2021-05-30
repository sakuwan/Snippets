/* === Helper functions & class composition ===
 *
 * createMethodDescriptors: Enumerate all properties of a provided object and
 * create a valid descriptor object for Object.defineProperties, retaining
 * function names
 *
 * applyMethodMixins: Extend the prototype of the provided object with the
 * provided mixins, creating property descriptors using createMethodDescriptors.
 *
 * A compositional approach to prototypal inheritance is preferred here over
 * class inheritance, due to the overhead of super and composition allowing
 * for better selection of what is composed, without influencing other elements
*/
const createMethodDescriptors = (obj) => {
  const defaultConfiguration = {
    enumerable: false,
    writable: false,
    configurable: false,
  };

  const makeDescriptors = (a, c) => ({
    ...a,
    [c]: { ...defaultConfiguration, ...Object.getOwnPropertyDescriptor(obj, c) },
  });

  const propertyKeys = [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
  return propertyKeys.reduce(makeDescriptors, {});
};

// eslint-disable-next-line import/prefer-default-export
export const applyMethodMixins = (obj, ...mixins) => {
  const objPrototype = obj.prototype ?? Object.getPrototypeOf(obj);
  const applyMixin = (mixin) => {
    const mixinDescriptor = createMethodDescriptors(mixin);
    Object.defineProperties(objPrototype, mixinDescriptor);
  };

  mixins.forEach(applyMixin);
};
