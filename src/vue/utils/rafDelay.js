// eslint-disable-next-line import/prefer-default-export
export const rafDelay = (fn, delay) => {
  const start = performance.now();
  const handle = { value: null };

  const rafLoop = (now) => {
    if ((now - start) >= delay) { fn(); return; }

    handle.value = requestAnimationFrame(rafLoop);
  };

  handle.value = requestAnimationFrame(rafLoop);

  return () => cancelAnimationFrame(handle.value);
};
