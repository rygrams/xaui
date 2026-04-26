export const flexibleDocs = {
  name: 'Flexible',
  description:
    "Like Expanded but with a fit prop — tight forces the child to fill all allotted space, loose allows the child to be smaller. Identical to Flutter's Flexible widget.",
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Flexible } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Flexible } from '@xaui/hybrid/flexible'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the flexible container',
    },
    {
      name: 'flex',
      type: 'number',
      default: '1',
      description: 'Flex factor — how much space to claim relative to siblings',
    },
    {
      name: 'fit',
      type: '"tight" | "loose"',
      default: '"loose"',
      description:
        'tight forces the child to fill all allotted space (like Expanded); loose allows the child to be at most the allotted size',
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
      title: 'Loose fit',
      code: `import { Row, Flexible } from '@xaui/native/view'
import { View } from 'react-native'

<Row>
  <Flexible flex={1}>
    <View style={{ height: 40, width: 40, backgroundColor: '#6366f1', borderRadius: 8 }} />
  </Flexible>
  <Flexible flex={2}>
    <View style={{ height: 40, width: 80, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  </Flexible>
</Row>`,
    },
    {
      title: 'Tight fit (like Expanded)',
      code: `import { Row, Flexible } from '@xaui/native/view'
import { View } from 'react-native'

<Row gap={8}>
  <Flexible flex={1} fit="tight">
    <View style={{ height: 60, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
  </Flexible>
  <Flexible flex={2} fit="tight">
    <View style={{ height: 60, backgroundColor: '#38bdf8', borderRadius: 8 }} />
  </Flexible>
</Row>`,
    },
  ],
}
