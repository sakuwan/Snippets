const RESERVED_KEYS = [
  '@@utility',
  '@@extends',
  '@@variants',
];

const isReservedKey = (k) => RESERVED_KEYS.indexOf(k) !== -1;
const isSimplePlugin = (keys, entry) => keys.every(
  (k) => isReservedKey(k) || typeof entry[k] === 'string',
);

// eslint-disable-next-line object-curly-newline
const createUtility = (property, entry = null) => ({ addUtilities, e, theme, variants }) => {
  const prefixEntry = (s) => (s === 'default' ? '' : `-${s}`);

  const isComplex = entry !== null;
  const makeEntry = (key, value) => (
    isComplex
      ? { [`.${e(`${property}${prefixEntry(key)}`)}`]: { ...value } }
      : { [`.${e(`${property}-${key}`)}`]: { [property]: `${value}` } }
  );

  const makeUtilities = (styles) => (utils, key) => ({
    ...utils, ...makeEntry(key, styles[key]),
  });

  const themeEntry = isComplex ? entry : theme(property);
  const newUtilities = Object.keys(themeEntry).reduce(makeUtilities(themeEntry), {});

  addUtilities(newUtilities, variants(property));
};

const createVariants = (property, variants) => ({
  [property]: [].concat(variants),
});

const extendThemeOptions = (entry) => (options, key) => {
  const { theme, variants, plugins } = options;

  const themeEntry = entry[key];
  const entryKeys = Object.keys(themeEntry);

  const hasUtility = entryKeys.indexOf('@@utility') !== -1;
  const hasExtends = entryKeys.indexOf('@@extends') !== -1;
  const hasVariants = entryKeys.indexOf('@@variants') !== -1;

  const themeObj = hasExtends ? theme.extend : theme;
  const variantsObj = hasExtends ? variants.extend : variants;

  const filteredEntry = entryKeys.reduce((o, k) => ({
    ...o,
    ...(isReservedKey(k) ? {} : { [k]: themeEntry[k] }),
  }), {});

  if (hasVariants) Object.assign(variantsObj, createVariants(key, themeEntry['@@variants']));

  const isSimple = hasUtility && isSimplePlugin(entryKeys, filteredEntry);
  if (isSimple || !hasUtility) Object.assign(themeObj, { [key]: filteredEntry });

  if (hasUtility) plugins.push(createUtility(key, isSimple ? null : filteredEntry));

  return options;
};

const createTailwindConfig = (theme, options = {}) => {
  const themeKeys = Object.keys(theme);
  if (themeKeys.length === 0) return options;

  return themeKeys.reduce(extendThemeOptions(theme), options);
};

module.exports = { createTailwindConfig };
