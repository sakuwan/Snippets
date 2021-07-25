import {
  ref,
  reactive,
  toRefs,

  onBeforeUnmount,
} from 'vue';

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
export const useScroll = (element, onScroll = null, options = {}) => {
  const { eventOpts, ...wrapperOpts } = { ...defaultOptions, ...options };

  const scrollRef = ref(element);
  const scrollState = reactive({
    scrollTop: 0,
    scrollLeft: 0,

    scrollXRatio: 0,
    scrollYRatio: 0,
  });

  const scrollListener = wrapEventListener((event) => {
    onScroll?.(event);

    const { target } = event;
    if (isNullish(target)) return;

    scrollState.scrollTop = target.scrollTop;
    scrollState.scrollLeft = target.scrollLeft;
    scrollState.scrollXRatio = calcScrollOffsetX(target);
    scrollState.scrollYRatio = calcScrollOffsetY(target);
  }, wrapperOpts);

  const removeHook = useEvent(scrollRef, 'scroll', scrollListener, eventOpts);

  onBeforeUnmount(() => { removeHook(); });

  return { ...toRefs(scrollState), removeHook };
};
