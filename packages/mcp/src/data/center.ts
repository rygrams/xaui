export const centerDocs = {
  name: 'Center',
  description:
    'Centers a child horizontally and vertically within available space. Center is Align preconfigured with alignment="center" — identical to Flutter\'s Center widget.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Center } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Center } from '@xaui/hybrid/center'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to center',
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
      title: 'Centered child',
      code: `import { Center } from '@xaui/native/view'
import { View } from 'react-native'

<Center>
  <View style={{ width: 80, height: 80, backgroundColor: '#6366f1', borderRadius: 40 }} />
</Center>`,
    },
    {
      title: 'Full-screen loading indicator',
      code: `import { Center } from '@xaui/native/view'
import { ActivityIndicator } from 'react-native'

<Center>
  <ActivityIndicator size="large" />
</Center>`,
    },
  ],
}
