export const aspectRatioDocs = {
  name: 'AspectRatio',
  description:
    'A Flutter-inspired box that forces its child to a specific aspect ratio — equivalent to AspectRatio. Available in both @xaui/native (React Native) and @xaui/hybrid (React web/webview).',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { AspectRatio } from '@xaui/native/view'",
      platform: 'React Native — renders as View',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { AspectRatio } from '@xaui/hybrid/view'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    {
      name: 'ratio',
      type: 'number',
      default: '-',
      description: 'Aspect ratio (width / height). Required',
    },
    {
      name: 'alignment',
      type: 'Alignment',
      default: '-',
      description: 'How to align the child (topLeft, center, bottomRight, { x, y })',
    },
    {
      name: 'clip',
      type: 'boolean',
      default: 'false',
      description: 'Whether to clip overflow',
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
      title: '16:9 video thumbnail',
      code: `import { AspectRatio } from '@xaui/native/view'

<AspectRatio ratio={16 / 9}>
  <Image source={{ uri: 'https://example.com/thumb.jpg' }} style={{ width: '100%', height: '100%' }} />
</AspectRatio>`,
    },
    {
      title: 'Square avatar',
      code: `import { AspectRatio } from '@xaui/native/view'

<AspectRatio ratio={1} clip>
  <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={{ width: '100%', height: '100%' }} />
</AspectRatio>`,
    },
    {
      title: 'With clip',
      code: `import { AspectRatio } from '@xaui/native/view'

<AspectRatio ratio={16 / 9} clip>
  <View style={{ backgroundColor: '#0891b2', width: '100%', height: '100%' }} />
</AspectRatio>`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { AspectRatio } from '@xaui/hybrid/aspect-ratio'

<AspectRatio ratio={16 / 9}>
  {/* web content constrained to 16:9 */}
</AspectRatio>`,
    },
  ],
}
