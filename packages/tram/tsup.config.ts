import { defineConfig } from 'tsup'

/** One entry per subpath; a component adds its own line here and in `package.json`. */
const entries = {
  index: 'src/index.ts',
  'theme/index': 'src/theme/index.ts',
  'motion/index': 'src/motion/index.ts',
  'components/button/index': 'src/components/button/index.ts',
  'components/checkbox/index': 'src/components/checkbox/index.ts',
  'components/dialog/index': 'src/components/dialog/index.ts',
  'components/progress-bar/index': 'src/components/progress-bar/index.ts',
  'components/radio/index': 'src/components/radio/index.ts',
  'components/select/index': 'src/components/select/index.ts',
  'components/slider/index': 'src/components/slider/index.ts',
  'components/switch/index': 'src/components/switch/index.ts',
  'components/tabs/index': 'src/components/tabs/index.ts',
  'components/text-area/index': 'src/components/text-area/index.ts',
  'components/text-field/index': 'src/components/text-field/index.ts',
  'components/tile/index': 'src/components/tile/index.ts',
  'components/toast/index': 'src/components/toast/index.ts',
  'components/typography/index': 'src/components/typography/index.ts',
  'components/wheel-picker/index': 'src/components/wheel-picker/index.ts',
}

export default defineConfig({
  entry: entries,
  format: ['cjs', 'esm'],
  // As in Native: the sources never `import React`, and esbuild reads `"jsx":
  // "react-native"` as the classic runtime, which emits `React.createElement` against
  // an undefined binding.
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
  clean: true,
  // Types come from `tsc --emitDeclarationOnly` in the `build` script, as in Native.
  splitting: true,
  target: 'es2020',
  /**
   * `@xaui/native` stays an import. Bundling it would ship a second recipe cache and a
   * second theme context, and a Tram component would read a provider nobody mounted.
   */
  external: [
    /^@xaui\/native(\/.*)?$/,
    'react',
    'react-native',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-worklets',
  ],
})
