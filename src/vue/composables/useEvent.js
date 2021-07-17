import { ref, watch } from 'vue';

import { isNullish } from '../utils/isNullish';

// eslint-disable-next-line import/prefer-default-export
export const useEvent = (element, name, listener, options = false) => {
  const elementRef = ref(element);

  const attachEvent = (el) => { el.addEventListener(name, listener, options); };
  const removeEvent = (el) => { el.removeEventListener(name, listener, options); };

  const removeWatcher = watch(elementRef, (now, _, onInvalidate) => {
    if (isNullish(now)) return;

    attachEvent(now);
    onInvalidate(() => removeEvent(now));
  }, { immediate: true, flush: 'post' });

  return () => {
    removeEvent(elementRef.value);
    removeWatcher();
  };
};
