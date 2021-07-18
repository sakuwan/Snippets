import { isFunction } from './isFunction';

import { throttle } from './throttle';
import { debounce } from './debounce';

// eslint-disable-next-line import/prefer-default-export
export const wrapEventListener = (eventFn, { wrapType, wrapDelay }) => {
  if (isFunction(wrapType)) return wrapType(eventFn, wrapDelay);

  if (wrapType === 'throttle') return throttle(eventFn, wrapDelay);
  if (wrapType === 'debounce') return debounce(eventFn, wrapDelay);

  return eventFn;
};
