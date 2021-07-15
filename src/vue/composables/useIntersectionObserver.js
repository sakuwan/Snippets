import { ref, watch, onBeforeUnmount } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useIntersectionObserver = (element, options = {}, onIntersect = null) => {
  const elementRef = ref(element);
  const isIntersecting = ref(false);

  const observer = new IntersectionObserver((entries) => {
    onIntersect?.(entries, observer);
    isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
  }, options);

  onBeforeUnmount(() => { observer.disconnect(); });

  watch(elementRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.unobserve(oldValue);
      isIntersecting.value = false;
    }

    if (newValue) observer.observe(newValue);
  }, { flush: 'post' });

  return { isIntersecting };
};
