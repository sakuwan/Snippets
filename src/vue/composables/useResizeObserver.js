import {
  ref,
  watch,
  readonly,

  onBeforeUnmount,
} from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useResizeObserver = (options = {}, onResize = null) => {
  const resizeRef = ref(null);

  const contentRect = ref(null);
  const borderBoxSize = ref(null);
  const contentBoxSize = ref(null);

  const observer = new ResizeObserver((entries) => {
    onResize?.(entries, observer);

    const [resizeEntry] = entries;
    if (resizeEntry === undefined) return;

    const [borderBoxFragment] = resizeEntry.borderBoxSize;
    const [contentBoxFragment] = resizeEntry.contentBoxSize;

    contentRect.value = resizeEntry.contentRect;
    borderBoxSize.value = borderBoxFragment;
    contentBoxSize.value = contentBoxFragment;
  });

  onBeforeUnmount(() => { observer.disconnect(); });

  watch(resizeRef, (now, prev) => {
    if (prev) {
      observer.unobserve(prev);

      contentRect.value = null;
      borderBoxSize.value = null;
      contentBoxSize.value = null;
    }

    if (now) observer.observe(now, options);
  }, { flush: 'post' });

  return {
    resizeRef,

    contentRect: readonly(contentRect),
    borderBoxSize: readonly(borderBoxSize),
    contentBoxSize: readonly(contentBoxSize),
  };
};
