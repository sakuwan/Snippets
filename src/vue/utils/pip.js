export const pointInRect = (x, y, rect) => (
  x >= rect.left
  && y >= rect.top
  && x <= (rect.right ?? x + rect.width)
  && y <= (rect.bottom ?? y + rect.height)
);

export const pointInCircle = (x, y, circle) => (
  (((x - circle.cx) ** 2) + ((y - circle.cy) ** 2)) <= circle.r ** 2
);
