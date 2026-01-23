import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'core/index': 'src/core/index.ts',
    'progress/index': 'src/components/progress/index.ts',
    'indicator/index': 'src/components/indicator/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'framer-motion', 'tailwindcss', '@xaui/core'],
  target: 'es2020',
})
