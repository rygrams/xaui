export const alertDocs = {
  name: 'Alert',
  description:
    'Displays contextual feedback messages for success, info, warning, or error states. Supports four variants (solid, bordered, flat, faded), theme colors, closable behavior, and animated open/close transitions. Available in @xaui/native and @xaui/hybrid.',
  packages: {
    native: {
      package: '@xaui/native',
      import: "import { Alert } from '@xaui/native/alert'",
      platform: 'React Native — renders as Animated.View with Reanimated',
    },
    hybrid: {
      package: '@xaui/hybrid',
      import: "import { Alert } from '@xaui/hybrid/alert'",
      platform: 'React web / mobile webview — renders as div with CSS transitions',
    },
  },
  props: [
    {
      name: 'title',
      type: 'ReactNode',
      default: '-',
      description: 'The title of the alert',
    },
    {
      name: 'description',
      type: 'ReactNode',
      default: '-',
      description: 'The description content of the alert',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      default: '-',
      description:
        'Custom icon to display. If omitted, an icon is auto-selected based on themeColor',
    },
    {
      name: 'themeColor',
      type: 'ThemeColor',
      default: "'default'",
      description:
        "Theme color — 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'",
    },
    {
      name: 'variant',
      type: 'AlertVariant',
      default: "'flat'",
      description: "Visual style — 'solid' | 'bordered' | 'flat' | 'faded'",
    },
    {
      name: 'radius',
      type: 'AlertRadius',
      default: "'md'",
      description: "Border radius — 'none' | 'sm' | 'md' | 'lg' | 'full'",
    },
    {
      name: 'isClosable',
      type: 'boolean',
      default: 'false',
      description: 'Whether the alert shows a close button',
    },
    {
      name: 'hideIcon',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide the icon',
    },
    {
      name: 'closeButton',
      type: 'ReactNode',
      default: '-',
      description: 'Custom close button element',
    },
    {
      name: 'isVisible',
      type: 'boolean',
      default: 'true',
      description:
        'Controlled visibility. Omit for uncontrolled (auto-visible) behavior',
    },
    {
      name: 'style',
      type: 'ViewStyle',
      default: '-',
      description: 'Custom style for the alert container',
    },
    {
      name: 'titleStyle',
      type: 'TextStyle',
      default: '-',
      description: 'Custom style for the alert title',
    },
    {
      name: 'descriptionStyle',
      type: 'TextStyle',
      default: '-',
      description: 'Custom style for the alert description',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'Additional content rendered below the description',
    },
    {
      name: 'onClose',
      type: '() => void',
      default: '-',
      description: 'Callback fired when the alert is closed',
    },
    {
      name: 'onVisibleChange',
      type: '(isVisible: boolean) => void',
      default: '-',
      description: 'Callback fired when the alert visibility changes',
    },
  ],
  examples: [
    {
      title: 'Theme colors',
      code: `import { Alert } from '@xaui/native/alert'

<Alert title="Default" description="A default message." themeColor="default" />
<Alert title="Primary" description="Important information." themeColor="primary" />
<Alert title="Success" description="Operation completed!" themeColor="success" />
<Alert title="Warning" description="Proceed with caution." themeColor="warning" />
<Alert title="Danger" description="Something went wrong." themeColor="danger" />`,
    },
    {
      title: 'Variants',
      code: `import { Alert } from '@xaui/native/alert'

<Alert title="Flat" description="Subtle container background." themeColor="primary" variant="flat" />
<Alert title="Solid" description="Strong filled background." themeColor="primary" variant="solid" />
<Alert title="Bordered" description="Outlined with a colored border." themeColor="primary" variant="bordered" />
<Alert title="Faded" description="Semi-transparent background." themeColor="primary" variant="faded" />`,
    },
    {
      title: 'Closable alert',
      code: `import { Alert } from '@xaui/native/alert'

const [visible, setVisible] = useState(true)

<Alert
  title="Dismiss me"
  description="Click the close button to hide this alert."
  themeColor="success"
  variant="flat"
  isClosable
  isVisible={visible}
  onVisibleChange={setVisible}
  onClose={() => console.log('closed')}
/>`,
    },
    {
      title: 'Hybrid (web) usage',
      code: `import { Alert } from '@xaui/hybrid/alert'

<Alert
  title="Welcome"
  description="You have successfully signed in."
  themeColor="success"
  variant="flat"
  radius="lg"
  isClosable
  onClose={() => console.log('closed')}
/>`,
    },
  ],
}
