const nextPlugin = require('@next/eslint-plugin-next')
const tsParser = require('@typescript-eslint/parser')

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn'
    }
  }
] 