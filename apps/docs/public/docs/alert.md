# Alert

Displays contextual feedback messages for success, info, warning, or error states. Supports five variants (solid, bordered, flat, faded, glass), theme colors, closable behavior, and animated open/close transitions.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Alert } from '@xaui/native-legacy/alert'
```

**Web / Hybrid**

```ts
import { Alert } from '@xaui/hybrid/alert'
```

## Props

| Prop               | Type                           | Default     | Description                                                                                 |
| ------------------ | ------------------------------ | ----------- | ------------------------------------------------------------------------------------------- |
| `title`            | `ReactNode`                    | —           | Alert title                                                                                 |
| `description`      | `ReactNode`                    | —           | Description content                                                                         |
| `icon`             | `ReactNode`                    | —           | Custom icon (auto-selected by themeColor if omitted)                                        |
| `themeColor`       | `ThemeColor`                   | `'default'` | `'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'warning' \| 'danger'` |
| `variant`          | `AlertVariant`                 | `'flat'`    | `'solid' \| 'bordered' \| 'flat' \| 'faded' \| 'glass'`                                     |
| `radius`           | `number \| string`             | `8`         | Border radius — number in pixels or any CSS value (e.g. `"50%"`) — hybrid only for strings |
| `isClosable`       | `boolean`                      | `false`     | Show close button                                                                           |
| `hideIcon`         | `boolean`                      | `false`     | Hide the icon                                                                               |
| `closeButton`      | `ReactNode`                    | —           | Custom close button                                                                         |
| `isVisible`        | `boolean`                      | `true`      | Controlled visibility                                                                       |
| `style`            | `ViewStyle`                    | —           | Custom style for the alert container                                                        |
| `titleStyle`       | `TextStyle`                    | —           | Custom style for the alert title                                                            |
| `descriptionStyle` | `TextStyle`                    | —           | Custom style for the alert description                                                      |
| `children`         | `ReactNode`                    | —           | Extra content below description                                                             |
| `onClose`          | `() => void`                   | —           | Fired when alert is closed                                                                  |
| `onVisibleChange`  | `(isVisible: boolean) => void` | —           | Fired on visibility change                                                                  |

## Examples

### Theme colors

```tsx
import { Alert } from '@xaui/native-legacy/alert'

<Alert title="Default" description="A default message." themeColor="default" />
<Alert title="Primary" description="Important info." themeColor="primary" />
<Alert title="Success" description="Operation completed!" themeColor="success" />
<Alert title="Warning" description="Proceed with caution." themeColor="warning" />
<Alert title="Danger" description="Something went wrong." themeColor="danger" />
```

### Variants

```tsx
import { Alert } from '@xaui/native-legacy/alert'

<Alert title="Flat" description="Subtle container background." themeColor="primary" variant="flat" />
<Alert title="Solid" description="Strong filled background." themeColor="primary" variant="solid" />
<Alert title="Bordered" description="Outlined with a colored border." themeColor="primary" variant="bordered" />
<Alert title="Faded" description="Semi-transparent background." themeColor="primary" variant="faded" />
<Alert title="Glass" description="Frosted glass effect." themeColor="primary" variant="glass" />
```

### Closable alert

```tsx
import { Alert } from '@xaui/native-legacy/alert'

const [visible, setVisible] = useState(true)

<Alert
  title="Dismiss me"
  description="Click the close button to hide."
  themeColor="success"
  variant="flat"
  isClosable
  isVisible={visible}
  onVisibleChange={setVisible}
/>
```

### Custom styles

```tsx
import { Alert } from '@xaui/native-legacy/alert'

;<Alert
  title="Custom Styled"
  description="With custom title and description styles."
  themeColor="primary"
  radius={12}
  style={{ borderWidth: 2, borderColor: '#a855f7' }}
  titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
  descriptionStyle={{ fontStyle: 'italic' }}
/>
```
