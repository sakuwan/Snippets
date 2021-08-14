import { reactive, toRefs, onBeforeUnmount } from 'vue';

import { useEvent } from './useEvent';

import { isDefined } from '../utils/isDefined';
import { passiveSupported } from '../utils/passiveSupported';
import { wrapEventListener } from '../utils/wrapEventListener';

const defaultOptions = Object.freeze({
  wrapDelay: 50,
  wrapType: 'debounce',

  eventOpts: passiveSupported() ? { passive: true } : false,
});

const eventState = {
  count: 0,
  removeHook: null,
  subscribers: new Map(),
};

const viewportState = reactive({
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
});

// eslint-disable-next-line import/prefer-default-export
export const useViewport = (options = {}, onViewportChange = null) => {
  // Check if this is the first use of the composable, attach window listener
  const isEventAttached = isDefined(eventState.removeHook);
  if (!isEventAttached) {
    const { eventOpts, ...wrapperOpts } = { ...defaultOptions, ...options };

    const resizeListener = wrapEventListener((event) => {
      // Invoke all of the valid resize subscribers
      eventState.subscribers.forEach((_, fn) => { fn(event); });

      viewportState.viewportWidth = window.innerWidth;
      viewportState.viewportHeight = window.innerHeight;
    }, wrapperOpts);

    eventState.removeHook = useEvent(window, 'resize', resizeListener, eventOpts);
  }

  // Store any valid resize subscribers by key
  if (isDefined(onViewportChange)) {
    eventState.subscribers.set(onViewportChange, true);
  }

  // Remove subscription from subscriber map
  const unsubscribe = () => {
    const { subscribers } = eventState;
    if (subscribers.has(onViewportChange)) {
      subscribers.delete(onViewportChange);
    }
  };

  // Decrease the overall use count, removing the event hook if at zero
  onBeforeUnmount(() => {
    eventState.count -= 1;
    if (eventState.count === 0) {
      eventState.removeHook();
      eventState.removeHook = null;
    }

    unsubscribe();
  });

  // Increase the overall use count
  eventState.count += 1;

  return {
    ...toRefs(viewportState),

    removeHook: unsubscribe,
  };
};
