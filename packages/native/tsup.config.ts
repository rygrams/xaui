import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
}

export default defineConfig({
  entry: entries,
  format: ['cjs', 'esm'],
  clean: false,
  dts: true,
  splitting: true,
  target: 'es2020',
  external: [
    'react',
    'react-native',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-svg',
    'react-native-worklets',
  ],
})
