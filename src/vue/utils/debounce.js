// eslint-disable-next-line import/prefer-default-export
export const debounce = (fn, delay) => {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
