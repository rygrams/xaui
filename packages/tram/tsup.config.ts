import { defineConfig } from 'tsup'

/** One entry per subpath; a component adds its own line here and in `package.json`. */
const entries = {
  index: 'src/index.ts',
  'theme/index': 'src/theme/index.ts',
  'motion/index': 'src/motion/index.ts',
}

export default defineConfig({
  entry: entries,
  format: ['cjs', 'esm'],
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
    'react-native-reanimated',
    'react-native-worklets',
  ],
})
