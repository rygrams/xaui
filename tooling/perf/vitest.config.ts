import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const here = path.dirname(fileURLToPath(import.meta.url))

/**
 * Its own config, and not part of `pnpm test`: this measures rather than asserts
 * behaviour, and it renders components — which the repository's test convention keeps out
 * of `src/__tests__` on purpose. Run it with `pnpm perf:button`.
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^react-native$/,
        replacement: path.resolve(here, 'react-native.mock.tsx'),
      },
      {
        find: /^react-native-reanimated$/,
        replacement: path.resolve(here, 'react-native-reanimated.mock.tsx'),
      },
    ],
  },
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'jsdom',
    include: [path.resolve(here, '*.perf.tsx')],
  },
})
