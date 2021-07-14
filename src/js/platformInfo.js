export const IS_NODE = typeof process !== 'undefined';
export const IS_BROWSER = typeof window !== 'undefined';

export const platformInfo = () => {
  const userAgent = IS_BROWSER ? window.navigator.userAgent : 'ssr';
  const features = {
    resize: IS_BROWSER && 'ResizeObserver' in window,
    intersection: IS_BROWSER && 'IntersectionObserver' in window,

    touch: IS_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0),
  };

  return {
    features,

    // OS
    isAndroid: userAgent.match(/android/i) !== null,
    isIOS: userAgent.match(/iphone|ipad|ipod/i) !== null,
    isWindows: userAgent.match(/win/i) !== null,
    isMac: userAgent.match(/mac/i) !== null,
    isLinux: userAgent.match(/linux/i) !== null,

    // Browser
    isSSR: userAgent.match(/ssr/i) !== null,
    isChrome: userAgent.match(/chrome/i) !== null,
    isFirefox: userAgent.match(/firefox/i) !== null,
    isEdge: userAgent.match(/edge/i) !== null,
    isOpera: userAgent.match(/opera/i) !== null,
    isSafari: userAgent.match(/safari/i) !== null,
  };
};
