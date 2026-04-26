export const containerDocs = {
  name: 'Container',
  description:
    'A Flutter-inspired layout primitive that handles sizing, spacing, alignment, decoration, and interaction in a single composable component. Available in both @xaui/native (React Native) and @xaui/hybrid (React web/webview).',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Container } from '@xaui/native/view'",
      platform: 'React Native — renders as View or Pressable',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Container } from '@xaui/hybrid/container' // or '@xaui/hybrid/view'",
      platform: 'React web / mobile webview — renders as div',
    },
  },
  props: [
    { name: 'children', type: 'ReactNode', default: '-', description: 'Child elements to render inside the container' },
    { name: 'width', type: 'number | `${number}%`', default: '-', description: 'Container width (number for dp, string for percentage — native only)' },
    { name: 'height', type: 'number | `${number}%`', default: '-', description: 'Container height' },
    { name: 'minWidth', type: 'number', default: '-', description: 'Minimum width constraint' },
    { name: 'maxWidth', type: 'number', default: '-', description: 'Maximum width constraint' },
    { name: 'minHeight', type: 'number', default: '-', description: 'Minimum height constraint' },
    { name: 'maxHeight', type: 'number', default: '-', description: 'Maximum height constraint' },
    { name: 'aspectRatio', type: 'number', default: '-', description: 'Width-to-height aspect ratio' },
    { name: 'flex', type: 'number', default: '-', description: 'Flex grow/shrink value' },
    { name: 'padding', type: 'EdgeInsets', default: '-', description: 'Inner spacing — number for all sides or { top, bottom, left, right, horizontal, vertical }' },
    { name: 'margin', type: 'EdgeInsets', default: '-', description: 'Outer spacing — same shape as padding' },
    { name: 'alignment', type: 'Alignment', default: '-', description: 'Child alignment — "center" | "topLeft" | "bottomRight" | ... or { x, y } object' },
    { name: 'color', type: 'string', default: '-', description: 'Background color' },
    { name: 'border', type: 'Border', default: '-', description: 'Border — { color, width, style }' },
    { name: 'borderRadius', type: 'BorderRadius', default: '-', description: 'Corner radius — number for all corners or { topLeft, topRight, bottomLeft, bottomRight }' },
    { name: 'shadow', type: 'ShadowConfig', default: '-', description: 'Drop shadow — { color, offset: { x, y }, blur, opacity, elevation }' },
    { name: 'clip', type: 'boolean', default: 'false', description: 'Clip children to the container bounds (overflow: hidden)' },
    { name: 'transform', type: 'TransformConfig', default: '-', description: 'CSS/RN transforms — { rotate, scale, translateX, translateY, skewX, ... }' },
    { name: 'opacity', type: 'number', default: '-', description: 'Opacity from 0 to 1' },
    { name: 'onPress', type: '() => void', default: '-', description: 'Tap handler — makes container interactive (renders as Pressable in native)' },
    { name: 'onLongPress', type: '() => void', default: '-', description: 'Long press handler' },
    { name: 'onPressIn', type: '() => void', default: '-', description: 'Fired on pointer/touch down' },
    { name: 'onPressOut', type: '() => void', default: '-', description: 'Fired on pointer/touch up' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Suppress all press handlers when true' },
    { name: 'accessibilityLabel', type: 'string', default: '-', description: 'Screen reader label' },
    { name: 'testID', type: 'string', default: '-', description: 'Test identifier' },
    { name: 'style', type: 'StyleProp<ViewStyle> | CSSProperties', default: '-', description: 'Escape hatch for raw RN/CSS styles' },
    { name: 'className', type: 'string', default: '-', description: 'Tailwind class names (hybrid only)' },
  ],
  examples: [
    {
      title: 'Basic box',
      code: `import { Container } from '@xaui/native/view'

<Container
  width={200}
  height={100}
  color="#6366f1"
  borderRadius={12}
  alignment="center"
>
  {/* content */}
</Container>`,
    },
    {
      title: 'Card with shadow',
      code: `import { Container } from '@xaui/native/view'

<Container
  padding={{ horizontal: 16, vertical: 12 }}
  color="#ffffff"
  borderRadius={16}
  shadow={{ color: '#000', offset: { x: 0, y: 4 }, blur: 12, opacity: 0.08, elevation: 4 }}
>
  {/* card content */}
</Container>`,
    },
    {
      title: 'Pressable container',
      code: `import { Container } from '@xaui/native/view'

<Container
  onPress={() => console.log('pressed')}
  padding={16}
  color="#f3f4f6"
  borderRadius={8}
>
  {/* tappable content */}
</Container>`,
    },
    {
      title: 'Full-width row with border',
      code: `import { Container } from '@xaui/native/view'

<Container
  flex={1}
  padding={{ horizontal: 16, vertical: 8 }}
  border={{ color: '#e5e7eb', width: 1 }}
  borderRadius={8}
>
  {/* row content */}
</Container>`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { Container } from '@xaui/hybrid/container'

<Container
  width="100%"
  maxWidth={480}
  padding={{ horizontal: 24, vertical: 16 }}
  color="#ffffff"
  borderRadius={12}
  shadow={{ blur: 16, opacity: 0.1 }}
  className="mx-auto"
>
  {/* web content */}
</Container>`,
    },
  ],
}
