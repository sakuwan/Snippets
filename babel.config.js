module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
    }],
  ],

  exclude: [/node_modules/],

  comments: true,
};
