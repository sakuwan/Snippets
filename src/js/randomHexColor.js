// eslint-disable-next-line import/prefer-default-export
export const randomHexColor = () => (
  `#${Math.floor(Math.random() * 0xFFFFF * 1000000).toString(16).slice(0, 6)}`
);
