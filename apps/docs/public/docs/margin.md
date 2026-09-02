# Margin

Wraps content with configurable margin on any or all sides using Flutter's `EdgeInsets` API.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { Margin } from '@xaui/native-legacy/view'
```

## Props

| Prop       | Type                                     | Default | Description                                                                                    |
| ---------- | ---------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `margin`   | `EdgeInsets`                             | —       | Margin — number for uniform or `{ top, bottom, left, right, horizontal, vertical }` (required) |
| `children` | `ReactNode`                              | —       | Content to render inside the margin container                                                  |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`)                       |

### EdgeInsets

```ts
type EdgeInsets =
  | number
  | {
      top?: number
      bottom?: number
      left?: number
      right?: number
      horizontal?: number
      vertical?: number
    }
```

## Examples

### Uniform margin

```tsx
import { Margin } from '@xaui/native-legacy/view'

;<Margin margin={16}>
  <Card />
</Margin>
```

### Vertical margin only

```tsx
import { Margin } from '@xaui/native-legacy/view'

;<Margin margin={{ vertical: 20 }}>
  <Divider />
</Margin>
```

### Per-side margin

```tsx
import { Margin } from '@xaui/native-legacy/view'

;<Margin margin={{ top: 8, bottom: 24, left: 0, right: 0 }}>
  <Section title="Details" />
</Margin>
```
