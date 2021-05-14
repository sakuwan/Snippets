import { computed, unref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useClasses = (prop, fallback = '') => {
  const computedClasses = computed(() => {
    const classes = unref(prop);
    if (classes.length < 0) return fallback;

    return typeof classes === 'string' ? classes : classes.join(' ');
  });

  return computedClasses;
};
