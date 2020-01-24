module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['google', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    strict: 2
  }
};
