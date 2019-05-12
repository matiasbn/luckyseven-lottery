module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends:[
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:vue-types/strongly-recommended',
  ], 
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: [
    'vue',
  ],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
};
