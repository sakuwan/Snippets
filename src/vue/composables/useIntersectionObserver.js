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

  watch(intersectionRef, (now, prev) => {
    if (prev) {
      observer.unobserve(prev);
      isIntersecting.value = false;
    }

    if (now) observer.observe(now);
  }, { flush: 'post' });

  return { intersectionRef, isIntersecting };
};
