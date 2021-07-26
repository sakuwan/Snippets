import { isDefined } from './isDefined';
import { isNullish } from './isNullish';

const PointerEventMap = {
  start: 'pointerdown',
  move: 'pointermove',
  end: 'pointerup',
  cancel: 'pointercancel',
};

const MouseEventMap = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup',
};

const TouchEventMap = {
  start: 'touchstart',
  move: 'touchmove',
  end: 'touchend',
  cancel: 'touchcancel',
};

export const isTouchEvent = ({ touches = null }) => isDefined(touches);
export const isPointerEvent = ({ pointerId = null }) => isDefined(pointerId);

export const touchSupported = () => (
  !isNullish(window) && 'ontouchstart' in window
);

export const pointerSupported = () => (
  !isNullish(window) && 'PointerEvent' in window
);

export const getTouches = ({ type, changedTouches, targetTouches }) => (
  type === 'touchend' ? changedTouches : targetTouches
);

export const getPointerId = (event) => {
  const eventTouches = getTouches(event);

  return isNullish(eventTouches)
    ? event.pointerId
    : (eventTouches.length && eventTouches[0].identifier);
};

export const getPointerValues = (event) => {
  const eventTouches = getTouches(event);
  const { clientX, clientY } = isNullish(eventTouches)
    ? event
    : (eventTouches.length && eventTouches[0]);

  return [clientX, clientY];
};

export const getAvailablePointerEvents = (usePointer = false) => [
  ...(pointerSupported() && usePointer
    ? [{ ...PointerEventMap }]
    : [{ ...MouseEventMap }, { ...TouchEventMap }]
  ),
];
