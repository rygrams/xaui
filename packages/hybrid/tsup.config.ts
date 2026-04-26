import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
  'core/index': 'src/core/index.ts',
  'view/index': 'src/components/view/index.ts',
  'container/index': 'src/components/view/container/index.ts',
  'sized-box/index': 'src/components/view/sized-box/index.ts',
  'constrained-box/index': 'src/components/view/constrained-box/index.ts',
  'fractionally-sized-box/index':
    'src/components/view/fractionally-sized-box/index.ts',
  'aspect-ratio/index': 'src/components/view/aspect-ratio/index.ts',
  'padding/index': 'src/components/view/padding/index.ts',
  'margin/index': 'src/components/view/margin/index.ts',
  'align/index': 'src/components/view/align/index.ts',
  'center/index': 'src/components/view/center/index.ts',
  'flex/index': 'src/components/view/flex/index.ts',
  'row/index': 'src/components/view/row/index.ts',
  'column/index': 'src/components/view/column/index.ts',
  'expanded/index': 'src/components/view/expanded/index.ts',
  'flexible/index': 'src/components/view/flexible/index.ts',
  'spacer/index': 'src/components/view/spacer/index.ts',
  'wrap/index': 'src/components/view/wrap/index.ts',
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
