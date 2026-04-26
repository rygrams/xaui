export const columnDocs = {
  name: 'Column',
  description:
    'Flutter-inspired vertical flex layout. Column is Flex with direction="vertical" pre-set.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Column } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Column } from '@xaui/hybrid/column'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the column',
    },
    {
      name: 'mainAxisAlignment',
      type: '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"',
      default: '"start"',
      description: 'How to place children along the vertical axis',
    },
    {
      name: 'crossAxisAlignment',
      type: '"start" | "end" | "center" | "stretch"',
      default: '"center"',
      description: 'How to place children along the horizontal axis',
    },
    {
      name: 'mainAxisSize',
      type: '"min" | "max"',
      default: '"max"',
      description: 'Whether the column takes max or min vertical space',
    },
    {
      name: 'gap',
      type: 'number',
      default: '-',
      description: 'Gap between children in logical pixels',
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'false',
      description: 'Wrap children when they overflow vertically',
    },
    {
      name: 'reversed',
      type: 'boolean',
      default: 'false',
      description: 'Reverse the column direction (bottom to top)',
    },
    {
      name: 'flex',
      type: 'number',
      default: '-',
      description: 'Flex factor applied to the column itself',
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
      title: 'Basic column',
      code: `import { Column } from '@xaui/native/view'
import { View } from 'react-native'

<Column gap={12} crossAxisAlignment="stretch">
  <View style={{ height: 48, backgroundColor: '#6366f1', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
</Column>`,
    },
    {
      title: 'Centered column',
      code: `import { Column } from '@xaui/native/view'

<Column mainAxisAlignment="center" crossAxisAlignment="center" gap={16}>
  <Logo />
  <Typography variant="h2">Welcome</Typography>
  <Button label="Get started" onPress={handleStart} />
</Column>`,
    },
  ],
}
