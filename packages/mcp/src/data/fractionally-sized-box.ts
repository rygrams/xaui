export const fractionallySizedBoxDocs = {
  name: 'FractionallySizedBox',
  description:
    "A Flutter-inspired box that sizes its child as a fraction of the parent's dimensions — equivalent to FractionallySizedBox. Available in both @xaui/native (React Native) and @xaui/hybrid (React web/webview).",
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { FractionallySizedBox } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import:
        "import { FractionallySizedBox } from '@xaui/hybrid/fractionally-sized-box' // or '@xaui/hybrid/view'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'widthFactor',
      type: 'number',
      default: '-',
      description:
        'Fraction of the parent width (0–1). When undefined, child chooses its own width',
    },
    {
      name: 'heightFactor',
      type: 'number',
      default: '-',
      description:
        'Fraction of the parent height (0–1). When undefined, child chooses its own height',
    },
    {
      name: 'alignment',
      type: 'Alignment',
      default: '-',
      description: 'How to align the child (topLeft, center, bottomRight, { x, y })',
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
      title: 'Half width',
      code: `import { FractionallySizedBox } from '@xaui/native/view'

<FractionallySizedBox widthFactor={0.5}>
  <View style={{ backgroundColor: '#6b21a8', height: 40, borderRadius: 8 }} />
</FractionallySizedBox>`,
    },
    {
      title: 'Centered fraction',
      code: `import { FractionallySizedBox } from '@xaui/native/view'

<FractionallySizedBox widthFactor={0.5} heightFactor={0.5} alignment="center">
  <View style={{ backgroundColor: '#0891b2', borderRadius: 8 }} />
</FractionallySizedBox>`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { FractionallySizedBox } from '@xaui/hybrid/fractionally-sized-box'

<FractionallySizedBox widthFactor={0.5}>
  {/* web content sized to 50% of parent width */}
</FractionallySizedBox>`,
    },
  ],
}
