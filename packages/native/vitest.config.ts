import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: [
      // `style-cache` calls `StyleSheet.create`, and the real react-native entry point
      // cannot load under jsdom.
      {
        find: 'react-native',
        // eslint-disable-next-line no-undef
        replacement: path.resolve(__dirname, 'src/__tests__/__mocks__/react-native.ts'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['src/__tests__/__mocks__/**'],
    passWithNoTests: true,
  },
})
