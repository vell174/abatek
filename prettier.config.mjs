/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,

  // Vue
  vueIndentScriptAndStyle: false,

  // HTML
  htmlWhitespaceSensitivity: 'ignore',
};
export default config;
