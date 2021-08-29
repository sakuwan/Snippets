export const preloadImage = (url = '') => new Promise((resolve, reject) => {
  const cacheImage = new Image();

  cacheImage.onload = () => resolve(cacheImage);
  cacheImage.onerror = () => reject(url);

  cacheImage.src = url;
});

/*
 * Data :: Array -> [[width, height, url] ... []]
*/
export const preloadResponsiveImage = (prefix, data = []) => new Promise((resolve, reject) => {
  const cacheImage = new Image();

  cacheImage.onload = () => resolve(data);
  cacheImage.onerror = () => reject(data);

  const [xs, ...rest] = data;

  cacheImage.src = `${prefix}${xs[2]}`;
  cacheImage.srcset = rest.map(([width, _, url]) => `${prefix}${url} ${width}w`).join(', ');
});

export const preloadTransformedImage = (data = []) => new Promise((resolve, reject) => {
  const cacheImage = new Image();

  cacheImage.onload = () => resolve(data);
  cacheImage.onerror = () => reject(data);

  const [baseSrc, srcSet] = data;

  cacheImage.src = baseSrc;
  cacheImage.srcset = srcSet;
});
