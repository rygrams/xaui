export const constrainedBoxDocs = {
  name: 'ConstrainedBox',
  description:
    'A Flutter-inspired box that imposes min/max size constraints on its child — equivalent to ConstrainedBox + BoxConstraints. Available in both @xaui/native (React Native) and @xaui/hybrid (React web/webview).',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { ConstrainedBox } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import:
        "import { ConstrainedBox } from '@xaui/hybrid/constrained-box' // or '@xaui/hybrid/view'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'constraints',
      type: 'BoxConstraints',
      default: '-',
      description:
        'Size constraints — { minWidth?, maxWidth?, minHeight?, maxHeight? }',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Optional content',
    },
    {
      name: 'style',
      type: 'StyleProp<ViewStyle> / CSSProperties',
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
      title: 'Minimum width',
      code: `import { ConstrainedBox } from '@xaui/native/view'

<ConstrainedBox constraints={{ minWidth: 200 }}>
  <View style={{ backgroundColor: '#6b21a8', height: 40, borderRadius: 8 }} />
</ConstrainedBox>`,
    },
    {
      title: 'Maximum width',
      code: `import { ConstrainedBox } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

<ConstrainedBox constraints={{ maxWidth: 300 }}>
  <Typography>This text wraps instead of stretching across the full screen.</Typography>
</ConstrainedBox>`,
    },
    {
      title: 'Combined min/max constraints',
      code: `import { ConstrainedBox } from '@xaui/native/view'

<ConstrainedBox
  constraints={{
    minWidth: 100,
    maxWidth: 250,
    minHeight: 60,
    maxHeight: 120,
  }}
>
  <View style={{ flex: 1, backgroundColor: '#0891b2', borderRadius: 8 }} />
</ConstrainedBox>`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { ConstrainedBox } from '@xaui/hybrid/constrained-box'

<ConstrainedBox constraints={{ maxWidth: 400 }}>
  {/* web content constrained to max 400px */}
</ConstrainedBox>`,
    },
  ],
}
