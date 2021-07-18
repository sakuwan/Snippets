// eslint-disable-next-line import/prefer-default-export
export const throttle = (fn, delay) => {
  let isThrottled = false;

  return (...args) => {
    if (isThrottled) return undefined;

    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, delay);

    return fn(...args);
  };
};
