export const alignDocs = {
  name: 'Align',
  description:
    'Aligns a child within available space using a named position or fractional { x, y } coordinates — identical to Flutter\'s Align widget. Center is Align preconfigured with alignment="center".',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Align } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Align } from '@xaui/hybrid/align'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'alignment',
      type: 'Alignment',
      default: '-',
      description:
        'Where to place the child — named position ("center", "topLeft", "bottomRight"…) or { x, y } coordinates from 0 to 1 (required)',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to align inside the container',
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
      description: 'Test identifier (hybrid only)',
    },
  ],
  examples: [
    {
      title: 'Top-right alignment',
      code: `import { Align } from '@xaui/native/view'
import { View } from 'react-native'

<Align alignment="topRight">
  <View style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
</Align>`,
    },
    {
      title: 'Custom coordinates',
      code: `import { Align } from '@xaui/native/view'
import { View } from 'react-native'

<Align alignment={{ x: 0.25, y: 0.75 }}>
  <View style={{ width: 40, height: 40, backgroundColor: '#f43f5e', borderRadius: 20 }} />
</Align>`,
    },
  ],
}
