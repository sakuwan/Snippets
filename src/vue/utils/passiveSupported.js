let isPassiveSupported = null;

const checkPassiveSupport = () => {
  if (isPassiveSupported !== null) return isPassiveSupported;

  try {
    if (typeof window !== 'undefined') {
      const testListener = Object.defineProperty({}, 'passive', {
        get: () => { isPassiveSupported = true; return null; },
      });

      window.addEventListener('testListener', testListener, testListener);
      window.removeEventListener('testListener', testListener, testListener);
    }
  } catch (e) { isPassiveSupported = false; }

  return isPassiveSupported;
};

export const passiveSupported = () => checkPassiveSupport();
export const passiveEventOpts = () => (checkPassiveSupport() ? { passive: true } : false);
