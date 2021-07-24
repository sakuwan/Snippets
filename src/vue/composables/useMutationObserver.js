import { ref, watch, onBeforeUnmount } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useMutationObserver = (element, options = {}, onMutation = null) => {
  const mutationRef = ref(element);

  const observer = new MutationObserver((mutations) => {
    onMutation?.(mutations, observer);
  });

  const removeWatcher = watch(mutationRef, (now, prev) => {
    if (prev) observer.unobserve(prev);
    if (now) observer.observe(now, options);
  }, { immediate: true, flush: 'post' });

  const removeHook = () => {
    removeWatcher();
    observer.disconnect();
  };

  onBeforeUnmount(() => { removeHook(); });

  return removeHook;
};
