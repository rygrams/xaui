import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
  'core/index': 'src/core/index.ts',
  'view/index': 'src/components/view/index.ts',
} as const

export default defineConfig({
  entry: entries,
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  external: ['react', 'react-dom', 'styled-components', '@xaui/core'],
  target: 'es2020',
})
