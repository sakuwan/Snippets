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

export const touchSupported = () => (
  !isNullish(window) && 'ontouchstart' in window
);

export const pointerSupported = () => (
  !isNullish(window) && 'PointerEvent' in window
);

export const getTouches = ({ type, changedTouches, targetTouches }) => (
  type === 'touchend' ? changedTouches : targetTouches
);

export const getPointerValues = (event) => {
  const eventTouches = getTouches(event);
  const { clientX, clientY } = isNullish(eventTouches)
    ? event
    : (eventTouches.length && eventTouches[0]);

  return [clientX, clientY];
};

export const getAvailablePointerEvents = () => [
  ...(pointerSupported()
    ? [{ ...PointerEventMap }]
    : [{ ...MouseEventMap }, { ...TouchEventMap }]
  ),
];
