import { ref, onBeforeUnmount } from 'vue';

import { useEvent } from './useEvent';

import { passiveSupported } from '../utils/passiveSupported';
import { wrapEventListener } from '../utils/wrapEventListener';

const defaultOptions = Object.freeze({
  wrapDelay: 50,
  wrapType: 'debounce',

  eventOpts: passiveSupported() ? { passive: true } : false,
});

// eslint-disable-next-line import/prefer-default-export
export const useViewport = (options = {}, onViewportChange = null) => {
  const { eventOpts, ...wrapperOpts } = { ...defaultOptions, ...options };

  const viewportWidth = ref(window.innerWidth);
  const viewportHeight = ref(window.innerHeight);

  const resizeListener = wrapEventListener((event) => {
    onViewportChange?.(event);

    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
  }, wrapperOpts);

  const stopResize = useEvent(window, 'resize', resizeListener, eventOpts);

  onBeforeUnmount(() => { stopResize(); });

  return { viewportWidth, viewportHeight };
};