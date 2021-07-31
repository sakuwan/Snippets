import {
  ref,
  reactive,
  readonly,

  onBeforeUnmount,
} from 'vue';

import { useEvent } from './useEvent';

import {
  isTouchEvent,

  getPointerValues,
  getAvailablePointerEvents,
} from '../utils/pointerHelpers';

import { passiveEventOpts } from '../utils/passiveSupported';

// eslint-disable-next-line import/prefer-default-export
export const useSwipe = (element, options = {}) => {
  const {
    threshold = 50,
    onSwipeStart = null, onSwipeEnd = null, onSwipe = null,
  } = options;

  const swipeRef = ref(element);

  const isSwiping = ref(false);
  const swipeAngle = ref(null);
  const swipeDirection = ref(null);

  const swipeStart = reactive({ x: null, y: null });
  const swipeEnd = reactive({ x: null, y: null });
  const swipeDelta = reactive({ x: null, y: null });

  const state = {
    pointerId: null,
    isPointerDown: false,
  };

  const swipeStartHandler = (event) => {
    if (state.isPointerDown) {
      state.isPointerDown = false;

      return;
    }

    if (!(onSwipeStart?.(event) ?? true)) return;

    state.isPointerDown = true;

    const [clientX, clientY] = getPointerValues(event);

    swipeStart.x = clientX;
    swipeStart.y = clientY;
    swipeEnd.x = clientX;
    swipeEnd.y = clientY;

    isSwiping.value = false;
    swipeAngle.value = null;
    swipeDirection.value = null;
  };

  const swipeMoveHandler = (event) => {
    if (!state.isPointerDown) return;

    const [clientX, clientY] = getPointerValues(event);

    swipeEnd.x = clientX;
    swipeEnd.y = clientY;

    isSwiping.value = true;
  };

  const swipeEndHandler = (event) => {
    if (isTouchEvent(event)) event.preventDefault();

    if (!state.isPointerDown) return;

    state.isPointerDown = false;

    swipeDelta.x = swipeEnd.x - swipeStart.x;
    swipeDelta.y = swipeEnd.y - swipeStart.y;

    const absX = Math.abs(swipeDelta.x);
    const absY = Math.abs(swipeDelta.y);

    if (Math.max(absX, absY) >= threshold) {
      onSwipe?.(event);

      swipeAngle.value = -Math.atan2(swipeDelta.y, swipeDelta.x);

      if (absX > absY) {
        swipeDirection.value = (swipeDelta.x > 0) ? 'right' : 'left';
      } else {
        swipeDirection.value = (swipeDelta.y > 0) ? 'down' : 'up';
      }
    }

    onSwipeEnd?.(event);

    isSwiping.value = false;
  };

  const swipeCancelHandler = () => {
    state.isPointerDown = false;

    isSwiping.value = false;
  };

  const eventReducer = (acc, {
    start, move, end, cancel,
  }) => [
    ...acc,

    useEvent(swipeRef, start, swipeStartHandler, passiveEventOpts()),
    useEvent(swipeRef, move, swipeMoveHandler, passiveEventOpts()),
    useEvent(swipeRef, end, swipeEndHandler),
    ...(cancel ? [useEvent(swipeRef, cancel, swipeCancelHandler)] : []),
  ];

  const attachedEvents = getAvailablePointerEvents().reduce(eventReducer, []);
  const removeHook = () => attachedEvents.forEach((eventHook) => eventHook());

  onBeforeUnmount(() => { removeHook(); });

  return {
    isSwiping: readonly(isSwiping),
    swipeAngle: readonly(swipeAngle),
    swipeDirection: readonly(swipeDirection),

    swipeStart: readonly(swipeStart),
    swipeEnd: readonly(swipeEnd),
    swipeDelta: readonly(swipeDelta),

    removeHook,
  };
};
