const SCROLLBAR_WIDTH_KEY = Symbol('%%ScrollbarWidth');

// eslint-disable-next-line import/prefer-default-export
export const getScrollbarWidth = (container = document.body) => {
  if (SCROLLBAR_WIDTH_KEY in window) return window[SCROLLBAR_WIDTH_KEY];

  const scrollWrapper = document.createElement('div');
  const scrollElement = document.createElement('div');

  scrollWrapper.setAttribute('style', `
    display: block;
    box-sizing: content-box;

    width: 100px;
    height: 50px;
    overflow: hidden;

    position: absolute;
    right: 0;
    bottom: 0;

    opacity: 0;
    pointer-events: none;
  `);

  scrollWrapper.appendChild(scrollElement);
  container.appendChild(scrollWrapper);

  const baseWidth = scrollElement.offsetWidth;

  scrollWrapper.style.overflowY = 'scroll';

  scrollElement.style.width = '100%';
  scrollElement.style.height = '100px';

  const scrollbarWidth = baseWidth - scrollElement.offsetWidth;

  container.removeChild(scrollWrapper);
  window[SCROLLBAR_WIDTH_KEY] = scrollbarWidth;

  return scrollbarWidth;
};
