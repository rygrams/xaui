import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    progress: 'src/components/progress/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-svg',
    '@xaui/core',
    '@xaui/core/theme',
  ],
  target: 'es2020',
})
