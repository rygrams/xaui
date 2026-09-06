import { defineConfig } from 'tsup'

const entries = {
  index: 'src/index.ts',
  'components/accordion/index': 'src/components/accordion/index.ts',
  'components/alert/index': 'src/components/alert/index.ts',
  'components/avatar/index': 'src/components/avatar/index.ts',
  'components/badge/index': 'src/components/badge/index.ts',
  'components/bottom-sheet/index': 'src/components/bottom-sheet/index.ts',
  'components/button/index': 'src/components/button/index.ts',
  'components/card/index': 'src/components/card/index.ts',
  'components/checkbox/index': 'src/components/checkbox/index.ts',
  'components/chip/index': 'src/components/chip/index.ts',
  'components/dialog/index': 'src/components/dialog/index.ts',
  'components/divider/index': 'src/components/divider/index.ts',
  'components/field-group/index': 'src/components/field-group/index.ts',
  'components/input-otp/index': 'src/components/input-otp/index.ts',
  'components/menu/index': 'src/components/menu/index.ts',
  'components/popover/index': 'src/components/popover/index.ts',
  'components/progress-bar/index': 'src/components/progress-bar/index.ts',
  'components/progress-circle/index': 'src/components/progress-circle/index.ts',
  'components/radio/index': 'src/components/radio/index.ts',
  'components/select/index': 'src/components/select/index.ts',
  'components/skeleton/index': 'src/components/skeleton/index.ts',
  'components/slider/index': 'src/components/slider/index.ts',
  'components/spinner/index': 'src/components/spinner/index.ts',
  'components/stepper/index': 'src/components/stepper/index.ts',
  'components/surface/index': 'src/components/surface/index.ts',
  'components/switch/index': 'src/components/switch/index.ts',
  'components/tabs/index': 'src/components/tabs/index.ts',
  'components/tag-group/index': 'src/components/tag-group/index.ts',
  'components/text-area/index': 'src/components/text-area/index.ts',
  'components/text-field/index': 'src/components/text-field/index.ts',
  'components/toast/index': 'src/components/toast/index.ts',
  'components/typography/index': 'src/components/typography/index.ts',
  'components/view/index': 'src/components/view/index.ts',
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
  /**
   * **Load-bearing against `splitting`.** Split output names its shared chunks by content
   * hash, so a build whose entries changed writes new chunk names and leaves the old ones
   * behind. Without a clean, `dist/` becomes a mix of two builds: an entry from the first
   * still importing `chunk-ZF6KIHXH.js`, which the second replaced with a different hash
   * and never wrote. Metro then fails to resolve the subpath, with an error that names the
   * component and says nothing about chunks.
   *
   * It bites hardest across branches, because turbo restores a cached `dist/**` over
   * whatever is already there rather than in place of it.
   */
  clean: true,
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
