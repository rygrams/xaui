export const rowDocs = {
  name: 'Row',
  description:
    'Flutter-inspired horizontal flex layout. Row is Flex with direction="horizontal" pre-set.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Row } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Row } from '@xaui/hybrid/row'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the row',
    },
    {
      name: 'mainAxisAlignment',
      type: '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"',
      default: '"start"',
      description: 'How to place children along the horizontal axis',
    },
    {
      name: 'crossAxisAlignment',
      type: '"start" | "end" | "center" | "stretch"',
      default: '"center"',
      description: 'How to place children along the vertical axis',
    },
    {
      name: 'mainAxisSize',
      type: '"min" | "max"',
      default: '"max"',
      description: 'Whether the row takes max or min horizontal space',
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
      description: 'Wrap children onto multiple lines when they overflow',
    },
    {
      name: 'reversed',
      type: 'boolean',
      default: 'false',
      description: 'Reverse the row direction (right to left)',
    },
    {
      name: 'flex',
      type: 'number',
      default: '-',
      description: 'Flex factor applied to the row itself',
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
      title: 'Basic row with gap',
      code: `import { Row } from '@xaui/native/view'
import { View } from 'react-native'

<Row gap={12} crossAxisAlignment="center">
  <View style={{ width: 48, height: 48, backgroundColor: '#6366f1', borderRadius: 24 }} />
  <View style={{ flex: 1, height: 16, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
</Row>`,
    },
    {
      title: 'Space between',
      code: `import { Row } from '@xaui/native/view'

<Row mainAxisAlignment="spaceBetween" crossAxisAlignment="center">
  <Typography>Label</Typography>
  <Switch value={enabled} onValueChange={setEnabled} />
</Row>`,
    },
  ],
}
