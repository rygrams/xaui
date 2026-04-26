export const paddingDocs = {
  name: 'Padding',
  description:
    'Wraps content with configurable padding on any or all sides using Flutter\'s EdgeInsets API.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Padding } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Padding } from '@xaui/hybrid/padding'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'padding',
      type: 'EdgeInsets',
      default: '-',
      description:
        'Padding — number for uniform or { top, bottom, left, right, horizontal, vertical } (required)',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Content to render inside the padding container',
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
      title: 'Uniform padding',
      code: `import { Padding } from '@xaui/native/view'

<Padding padding={16}>
  <Card />
</Padding>`,
    },
    {
      title: 'Asymmetric padding',
      code: `import { Padding } from '@xaui/native/view'

<Padding padding={{ horizontal: 24, vertical: 12 }}>
  <Button label="Submit" onPress={handleSubmit} />
</Padding>`,
    },
  ],
}
