import baseConfig from '../../eslint.config.base.js'

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
  },
  {
    files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        HTMLElement: 'readonly',
      },
    },
  },
]
