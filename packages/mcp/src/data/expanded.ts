export const expandedDocs = {
  name: 'Expanded',
  description:
    "Expands a child to fill available space inside a Row or Column. The optional flex factor controls how much space this child claims relative to siblings — identical to Flutter's Expanded widget.",
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Expanded } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Expanded } from '@xaui/hybrid/expanded'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the expanded container',
    },
    {
      name: 'flex',
      type: 'number',
      default: '1',
      description:
        'Flex factor — how much available space to take relative to siblings',
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
      title: 'Equal distribution',
      code: `import { Row, Expanded } from '@xaui/native/view'
import { View } from 'react-native'

<Row>
  <Expanded>
    <View style={{ height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
  </Expanded>
  <Expanded>
    <View style={{ height: 60, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  </Expanded>
</Row>`,
    },
    {
      title: 'Weighted distribution',
      code: `import { Row, Expanded } from '@xaui/native/view'
import { View } from 'react-native'

<Row gap={8}>
  <Expanded flex={1}>
    <View style={{ height: 60, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
  </Expanded>
  <Expanded flex={2}>
    <View style={{ height: 60, backgroundColor: '#38bdf8', borderRadius: 8 }} />
  </Expanded>
</Row>`,
    },
  ],
}
