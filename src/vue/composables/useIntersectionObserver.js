import { ref, watch, onBeforeUnmount } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useIntersectionObserver = (options = {}, onIntersect = null) => {
  const isIntersecting = ref(false);
  const intersectionRef = ref(null);

  const observer = new IntersectionObserver((entries) => {
    onIntersect?.(entries, observer);
    isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
  }, options);

  onBeforeUnmount(() => { observer.disconnect(); });

  watch(intersectionRef, (newValue, oldValue) => {
    if (oldValue) {
      observer.unobserve(oldValue);
      isIntersecting.value = false;
    }

    if (newValue) observer.observe(newValue);
  }, { flush: 'post' });

  return { intersectionRef, isIntersecting };
};
