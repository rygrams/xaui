import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      'react-native': path.resolve(__dirname, 'src/__tests__/__mocks__/react-native.ts'),
      // eslint-disable-next-line no-undef
      'react-native-reanimated': path.resolve(
        __dirname,
        'src/__tests__/__mocks__/react-native-reanimated.ts'
      ),
      // eslint-disable-next-line no-undef
      'react-native-svg': path.resolve(
        __dirname,
        'src/__tests__/__mocks__/react-native-svg.ts'
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
  },
})
