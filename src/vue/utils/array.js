export const shuffle = (iterable, start = 0, end = iterable.length) => {
  const sorted = Array.from(iterable);

  for (let i = end - 1; i > start; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
  }

  return sorted;
};

export const sample = (iterable, start = 0, end = iterable.length - 1) => (
  iterable[Math.floor(Math.random() * (end - start) + start)]
);

export const weightedSample = (iterable, map) => {
  const buildWeightedSum = (acc, value) => (
    [...acc, acc[acc.length - 1] + (value / 100)]
  );

  const weightMap = Array
    .from(map)
    .sort()
    .reduce(buildWeightedSum, [0]);

  const bisectWeightmap = (index, lo = 0, hi = weightMap.length - 1) => {
    if (lo === hi) {
      return lo;
    }

    const mid = Math.floor((hi - lo) / 2) + lo;
    const weight = weightMap[mid];

    if (index < weight) {
      return bisectWeightmap(index, lo, mid);
    }

    if (index > weight) {
      return bisectWeightmap(index, mid + 1, hi);
    }

    return mid + 1;
  };

  return () => iterable[bisectWeightmap(Math.random()) - 1];
};
