export const wrapDocs = {
  name: 'Wrap',
  description:
    "Flex container that wraps children onto multiple lines with configurable spacing and run alignment — identical to Flutter's Wrap widget.",
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Wrap } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Wrap } from '@xaui/hybrid/wrap'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the wrap container',
    },
    {
      name: 'direction',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: 'Primary axis direction',
    },
    {
      name: 'alignment',
      type: '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"',
      default: '"start"',
      description: 'Alignment of children along the main axis within each run',
    },
    {
      name: 'runAlignment',
      type: '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"',
      default: '"start"',
      description: 'Alignment of runs along the cross axis',
    },
    {
      name: 'spacing',
      type: 'number',
      default: '0',
      description: 'Space between children along the main axis',
    },
    {
      name: 'runSpacing',
      type: 'number',
      default: '0',
      description: 'Space between runs along the cross axis',
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
      title: 'Chip list',
      code: `import { Wrap } from '@xaui/native/view'
import { Chip } from '@xaui/native/chip'

const tags = ['React', 'TypeScript', 'Flutter', 'UI', 'Mobile']

<Wrap spacing={8} runSpacing={8}>
  {tags.map((tag) => <Chip key={tag} label={tag} />)}
</Wrap>`,
    },
    {
      title: 'Centered wrapping row',
      code: `import { Wrap } from '@xaui/native/view'
import { View } from 'react-native'

<Wrap alignment="center" spacing={12} runSpacing={12}>
  {Array.from({ length: 7 }, (_, i) => (
    <View key={i} style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
  ))}
</Wrap>`,
    },
  ],
}
