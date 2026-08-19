// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier/recommended';

export default withNuxt([
  {
    ignores: ['.vscode/*', 'abatek-copy3/**'],
  },
  {
    files: ['**/*.ts', '**/*.vue', '*.mjs'],
    ...prettier,
  },
  {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['pages/**/*.vue', 'layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]);
