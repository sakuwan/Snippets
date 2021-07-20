import {
  ref,
  reactive,
  toRefs,

  onBeforeUnmount,
} from 'vue';

import { useEvent } from './useEvent';

import { passiveSupported } from '../utils/passiveSupported';
import { wrapEventListener } from '../utils/wrapEventListener';

const defaultOptions = Object.freeze({
  wrapDelay: 1000 / 60,
  wrapType: 'throttle',

  eventOpts: passiveSupported() ? { passive: true } : false,
});

// eslint-disable-next-line import/prefer-default-export
export const useMouse = (element, options = {}, onMouseMove = null) => {
  const { eventOpts, ...wrapperOpts } = { ...defaultOptions, ...options };

  const mouseRef = ref(element);
  const mouseState = reactive({
    pageX: null,
    pageY: null,

    mouseX: null,
    mouseY: null,
  });

  const mouseListener = wrapEventListener((event) => {
    onMouseMove?.(event);

    mouseState.pageX = event.pageX;
    mouseState.pageY = event.pageY;
    mouseState.mouseX = event.clientX;
    mouseState.mouseY = event.clientY;
  }, wrapperOpts);

  const stopMouse = useEvent(mouseRef, 'mousemove', mouseListener, eventOpts);

  onBeforeUnmount(() => { stopMouse(); });

  return { ...toRefs(mouseState) };
};
