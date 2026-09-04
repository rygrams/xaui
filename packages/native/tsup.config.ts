import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
  'components/alert/index': 'src/components/alert/index.ts',
  'components/button/index': 'src/components/button/index.ts',
  'components/chip/index': 'src/components/chip/index.ts',
  'components/input/index': 'src/components/input/index.ts',
  'components/input-otp/index': 'src/components/input-otp/index.ts',
  'components/text-area/index': 'src/components/text-area/index.ts',
  'system/index': 'src/system/index.ts',
  'theme/index': 'src/theme/index.ts',
}

export default defineConfig({
  entry: entries,
  format: ['cjs', 'esm'],
  /**
   * The sources never `import React`, so the classic transform esbuild picks by default
   * emits `React.createElement` against an undefined binding and every component in the
   * built package throws on first render. `tsconfig`'s `"jsx": "react-native"` does not
   * carry over — esbuild reads it as the classic runtime.
   */
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
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
