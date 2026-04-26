export const marginDocs = {
  name: 'Margin',
  description:
    'Wraps content with configurable margin on any or all sides using Flutter\'s EdgeInsets API.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Margin } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Margin } from '@xaui/hybrid/margin'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'margin',
      type: 'EdgeInsets',
      default: '-',
      description:
        'Margin — number for uniform or { top, bottom, left, right, horizontal, vertical } (required)',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the margin container',
    },
    {
      name: 'style',
      type: 'StyleProp<ViewStyle> / CSSProperties',
      default: '-',
      description: 'Style override',
    },
  ],
  examples: [
    {
      title: 'Uniform margin',
      code: `import { Margin } from '@xaui/native/view'

<Margin margin={16}>
  <Card />
</Margin>`,
    },
    {
      title: 'Vertical margin only',
      code: `import { Margin } from '@xaui/native/view'

<Margin margin={{ vertical: 20 }}>
  <Divider />
</Margin>`,
    },
  ],
}
