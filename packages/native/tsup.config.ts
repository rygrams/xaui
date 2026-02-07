import { defineConfig } from 'tsup'

export default defineConfig(options => {
  const isWatch = !!options.watch

  return {
    entry: {
      index: 'src/index.ts',
      'core/index': 'src/core/index.ts',
      'button/index': 'src/components/button/index.ts',
      'checkbox/index': 'src/components/checkbox/index.ts',
      'accordion/index': 'src/components/accordion/index.ts',
      'progress/index': 'src/components/progress/index.ts',
      'indicator/index': 'src/components/indicator/index.ts',
      'switch/index': 'src/components/switch/index.ts',
      'select/index': 'src/components/select/index.ts',
      'divider/index': 'src/components/divider/index.ts',
      'avatar/index': 'src/components/avatar/index.ts',
      'badge/index': 'src/components/badge/index.ts',
      'alert/index': 'src/components/alert/index.ts',
      'autocomplete/index': 'src/components/autocomplete/index.ts',
      'datepicker/index': 'src/components/datepicker/index.ts',
      'typography/index': 'src/components/typography/index.ts',
      'view/index': 'src/components/view/index.ts',
      'chip/index': 'src/components/chip/index.ts',
      'bottom-sheet/index': 'src/components/bottom-sheet/index.ts',
      'menu/index': 'src/components/menu/index.ts',
      'fab/index': 'src/components/fab/index.ts',
      'fab-menu/index': 'src/components/fab-menu/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: !isWatch,
    clean: !isWatch,
    external: [
      'react',
      'react-native',
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-svg',
      '@xaui/core',
      '@xaui/core/theme',
      '@xaui/icons',
    ],
    target: 'es2020',
  }
})
