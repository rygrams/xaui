import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      // Resolve workspace sources directly in tests (CI may not have built dist/)
      // eslint-disable-next-line no-undef
      { find: '@xaui/core/theme', replacement: path.resolve(__dirname, '../core/src/theme/index.ts') },
      // eslint-disable-next-line no-undef
      { find: '@xaui/core/palette', replacement: path.resolve(__dirname, '../core/src/tokens/index.ts') },
      // eslint-disable-next-line no-undef
      { find: '@xaui/core', replacement: path.resolve(__dirname, '../core/src/index.ts') },
      // eslint-disable-next-line no-undef
      { find: 'react-native', replacement: path.resolve(__dirname, 'src/__tests__/__mocks__/react-native.ts') },
      // eslint-disable-next-line no-undef
      { find: 'react-native-reanimated', replacement: path.resolve(__dirname, 'src/__tests__/__mocks__/react-native-reanimated.ts') },
      // eslint-disable-next-line no-undef
      { find: 'react-native-svg', replacement: path.resolve(__dirname, 'src/__tests__/__mocks__/react-native-svg.ts') },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
  },
})
