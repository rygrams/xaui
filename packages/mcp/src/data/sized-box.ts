export const sizedBoxDocs = {
  name: 'SizedBox',
  description:
    'A Flutter-inspired fixed-size box. Supports explicit width/height, expand (Expanded equivalent — fills available space), and shrink (SizedBox.shrink() — collapses to zero). Available in both @xaui/native (React Native) and @xaui/hybrid (React web/webview).',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { SizedBox } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { SizedBox } from '@xaui/hybrid/view'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'width',
      type: 'number',
      default: '-',
      description: 'Width in logical pixels',
    },
    {
      name: 'height',
      type: 'number',
      default: '-',
      description: 'Height in logical pixels',
    },
    {
      name: 'expand',
      type: 'boolean',
      default: 'false',
      description:
        'Fill all available space — flex: 1 + alignSelf: stretch. Flutter Expanded equivalent',
    },
    {
      name: 'shrink',
      type: 'boolean',
      default: 'false',
      description: 'Collapse to zero size. Flutter SizedBox.shrink() equivalent',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Optional content',
    },
    {
      name: 'style',
      type: 'StyleProp<ViewStyle> | CSSProperties',
      default: '-',
      description:
        'Style override (native: StyleProp<ViewStyle>, hybrid: CSSProperties)',
    },
    {
      name: 'testID',
      type: 'string',
      default: '-',
      description: 'Test identifier (native: testID, hybrid: data-testid)',
    },
  ],
  examples: [
    {
      title: 'Fixed spacer between items',
      code: `import { Column, SizedBox } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

<Column>
  <Typography>Section A</Typography>
  <SizedBox height={32} />
  <Typography>Section B</Typography>
</Column>`,
    },
    {
      title: 'Fixed-size container',
      code: `import { SizedBox } from '@xaui/native/view'
import { View } from 'react-native'

<SizedBox width={80} height={80}>
  <View style={{ flex: 1, backgroundColor: '#4f46e5', borderRadius: 8 }} />
</SizedBox>`,
    },
    {
      title: 'Expanded — fill remaining space',
      code: `import { Row, SizedBox } from '@xaui/native/view'

<Row>
  <SizedBox width={48} height={48} />
  <SizedBox expand>
    {/* fills remaining row space */}
  </SizedBox>
</Row>`,
    },
    {
      title: 'Shrink — collapse to zero',
      code: `import { SizedBox } from '@xaui/native/view'

<SizedBox shrink />`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { SizedBox } from '@xaui/hybrid/sized-box'

<SizedBox width={200} height={100}>
  {/* web content */}
</SizedBox>`,
    },
  ],
}
