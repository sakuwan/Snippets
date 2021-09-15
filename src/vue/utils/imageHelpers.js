export const linearScale = (
  { width, height }, availableSpace, transform = null, useWidth = false,
) => {
  const aspectRatio = availableSpace / (useWidth ? width : height);

  return [
    transform?.(width * aspectRatio) ?? width * aspectRatio,
    transform?.(height * aspectRatio) ?? height * aspectRatio,
    aspectRatio,
  ];
};

export const containScale = (
  { width, height }, newWidth, newHeight, minWidth, minHeight, transform = null,
) => {
  const aspectRatio = width / height;
  const scaledHeight = newWidth / aspectRatio;
  const renderedWidth = Math.max(
    minWidth,
    (scaledHeight > newHeight) ? newHeight * aspectRatio : newWidth,
  );

  const renderedHeight = Math.max(
    minHeight,
    (scaledHeight > newHeight) ? newHeight : scaledHeight,
  );

  return [
    transform?.(renderedWidth) ?? renderedWidth,
    transform?.(renderedHeight) ?? renderedHeight,
    aspectRatio,
  ];
};
