import { ref, onBeforeUnmount } from 'vue';

import { useEvent } from './useEvent';

import { isNullish } from '../utils/isNullish';
import { passiveSupported } from '../utils/passiveSupported';
import { wrapEventListener } from '../utils/wrapEventListener';

const defaultOptions = Object.freeze({
  wrapDelay: 20,
  wrapType: 'debounce',

  eventOpts: { ...(passiveSupported() && { passive: true }) },
});

const calcScrollOffsetX = ({ scrollLeft, scrollWidth, clientWidth }) => (
  scrollLeft / Math.max(Number.EPSILON, scrollWidth - clientWidth)
);

const calcScrollOffsetY = ({ scrollTop, scrollHeight, clientHeight }) => (
  scrollTop / Math.max(Number.EPSILON, scrollHeight - clientHeight)
);

// eslint-disable-next-line import/prefer-default-export
export const useScroll = (element, options = {}, onScroll = null) => {
  const scrollOptions = { ...defaultOptions, ...options };

  const scrollRef = ref(element);

  const scrollTop = ref(0);
  const scrollLeft = ref(0);
  const scrollXRatio = ref(0);
  const scrollYRatio = ref(0);

  const scrollListener = wrapEventListener((event) => {
    onScroll?.(event);

    const { target } = event;
    if (isNullish(target)) return;

    scrollTop.value = target.scrollTop;
    scrollLeft.value = target.scrollLeft;
    scrollXRatio.value = calcScrollOffsetX(target);
    scrollYRatio.value = calcScrollOffsetY(target);
  }, scrollOptions);

  const stopScroll = useEvent(
    scrollRef, 'scroll', scrollListener, scrollOptions.eventOpts,
  );

  onBeforeUnmount(() => { stopScroll(); });

  return {
    scrollTop,
    scrollLeft,
    scrollXRatio,
    scrollYRatio,
  };
};
