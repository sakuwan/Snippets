import { ref, unref, watch } from 'vue';

import { isNullish } from '../utils/isNullish';

// eslint-disable-next-line import/prefer-default-export
export const useCSSVariable = (property, element = null) => {
  const variableRef = ref('');
  const elementRef = ref(element ?? window?.document?.documentElement);

  watch(elementRef, (now) => {
    if (isNullish(now)) return;
    variableRef.value = window?.getComputedStyle(now).getPropertyValue(property);
  }, { immediate: true });

  watch(variableRef, (now) => {
    const currentElement = unref(elementRef);
    if (isNullish(currentElement)) return;

    currentElement.style.setProperty(property, now);
  });

  return variableRef;
};
