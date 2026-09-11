import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
  'components/typography/index': 'src/components/typography/index.ts',
  'system/index': 'src/system/index.ts',
  'theme/index': 'src/theme/index.ts',
}

export default defineConfig({
  entry: entries,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  splitting: true,
  target: 'es2020',
  external: [
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
    'react',
    'react-dom',
  ],
})
