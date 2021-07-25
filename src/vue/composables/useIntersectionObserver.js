import { ref, watch, onBeforeUnmount } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useIntersectionObserver = (onIntersect = null, options = {}) => {
  const isIntersecting = ref(false);
  const intersectionRef = ref(null);

  const observer = new IntersectionObserver((entries) => {
    onIntersect?.(entries, observer);
    isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
  }, options);

  const removeWatcher = watch(intersectionRef, (now, prev) => {
    if (prev) {
      observer.unobserve(prev);
      isIntersecting.value = false;
    }

    if (now) observer.observe(now);
  }, { flush: 'post' });

  const removeHook = () => {
    removeWatcher();
    observer.disconnect();
  };

  onBeforeUnmount(() => { removeHook(); });

  return {
    intersectionRef,

    isIntersecting,

    removeHook,
  };
};
