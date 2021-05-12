module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,

    es2021: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',

    ecmaVersion: 2021,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',

    'airbnb-base',
    'plugin:vue/vue3-essential',
  ],

  plugins: [
    'vue',
    'import',
  ],

  rules: {
    'no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
