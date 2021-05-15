import { computed, unref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useClasses = (prop, extend = '') => {
  const computedClasses = computed(() => {
    const classes = unref(prop);

    return typeof classes === 'string'
      ? `${classes} ${extend}`.trim()
      : [...classes, ...extend].join(' ').trim();
  });

  return computedClasses;
};
