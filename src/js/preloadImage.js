// eslint-disable-next-line import/prefer-default-export
export const preloadImage = (url = '') => new Promise((resolve, reject) => {
  const cacheImage = new Image();

  cacheImage.onload = () => resolve(url);
  cacheImage.onerror = () => reject(url);

  cacheImage.src = url;
});
