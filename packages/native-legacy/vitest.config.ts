import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      // Resolve workspace sources directly in tests (CI may not have built dist/)
      // eslint-disable-next-line no-undef
      {
        find: '@xaui/native/theme',
        replacement: path.resolve(__dirname, '../native/src/theme/index.ts'),
      },
      // eslint-disable-next-line no-undef
      {
        find: '@xaui/native',
        replacement: path.resolve(__dirname, '../native/src/index.ts'),
      },
      // eslint-disable-next-line no-undef
      {
        find: 'react-native',
        replacement: path.resolve(
          __dirname,
          'src/__tests__/__mocks__/react-native.ts'
        ),
      },
      // eslint-disable-next-line no-undef
      {
        find: 'react-native-reanimated',
        replacement: path.resolve(
          __dirname,
          'src/__tests__/__mocks__/react-native-reanimated.ts'
        ),
      },
      // eslint-disable-next-line no-undef
      {
        find: 'react-native-svg',
        replacement: path.resolve(
          __dirname,
          'src/__tests__/__mocks__/react-native-svg.ts'
        ),
      },
    ],
  },
  // The v1 sources pulled in through `@xaui/native` use the automatic JSX runtime; this
  // package's tsconfig says `react-native`, which esbuild reads as the classic one.
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
  },
})
