export const flexDocs = {
  name: 'Flex',
  description:
    'Generic Flutter-inspired flex container. Controls direction, alignment, gap, and wrapping. Use Row or Column for the common cases.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Flex } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Flex } from '@xaui/hybrid/flex'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'direction',
      type: '"horizontal" | "vertical"',
      default: '-',
      description:
        'Axis direction — horizontal for row, vertical for column (required)',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the flex container',
    },
    {
      name: 'mainAxisAlignment',
      type: '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"',
      default: '"start"',
      description: 'How to place children along the main axis',
    },
    {
      name: 'crossAxisAlignment',
      type: '"start" | "end" | "center" | "stretch"',
      default: '"center"',
      description: 'How to place children along the cross axis',
    },
    {
      name: 'mainAxisSize',
      type: '"min" | "max"',
      default: '"max"',
      description: 'Whether the container takes max or min space in the main axis',
    },
    {
      name: 'gap',
      type: 'number',
      default: '-',
      description: 'Gap in logical pixels between children',
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'false',
      description: 'Wrap children onto multiple lines when they overflow',
    },
    {
      name: 'reversed',
      type: 'boolean',
      default: 'false',
      description: 'Reverse the layout direction',
    },
    {
      name: 'flex',
      type: 'number',
      default: '-',
      description: 'Flex factor applied to the container itself',
    },
    {
      name: 'style',
      type: 'StyleProp<ViewStyle> / CSSProperties',
      default: '-',
      description: 'Style override',
    },
    {
      name: 'testID',
      type: 'string',
      default: '-',
      description: 'Test identifier for e2e tests',
    },
  ],
  examples: [
    {
      title: 'Row with space between',
      code: `import { Flex } from '@xaui/native/view'
import { View } from 'react-native'

<Flex direction="horizontal" mainAxisAlignment="spaceBetween" gap={8}>
  <View style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
  <View style={{ width: 60, height: 60, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  <View style={{ width: 60, height: 60, backgroundColor: '#a855f7', borderRadius: 8 }} />
</Flex>`,
    },
    {
      title: 'Vertical stack centered',
      code: `import { Flex } from '@xaui/native/view'
import { View } from 'react-native'

<Flex direction="vertical" crossAxisAlignment="center" gap={12}>
  <View style={{ width: 120, height: 40, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
  <View style={{ width: 80, height: 40, backgroundColor: '#38bdf8', borderRadius: 8 }} />
</Flex>`,
    },
  ],
}
