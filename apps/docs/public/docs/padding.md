# Padding

Wraps content with configurable padding on any or all sides using Flutter's `EdgeInsets` API.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { Padding } from '@xaui/native-legacy/view'
```

## Props

| Prop       | Type                                     | Default | Description                                                                                     |
| ---------- | ---------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `padding`  | `EdgeInsets`                             | —       | Padding — number for uniform or `{ top, bottom, left, right, horizontal, vertical }` (required) |
| `children` | `ReactNode`                              | —       | Content to render inside the padding container                                                  |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`)                        |

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

### Uniform padding

```tsx
import { Padding } from '@xaui/native-legacy/view'

;<Padding padding={16}>
  <Card />
</Padding>
```

### Asymmetric padding

```tsx
import { Padding } from '@xaui/native-legacy/view'

;<Padding padding={{ horizontal: 24, vertical: 12 }}>
  <Button label="Submit" onPress={handleSubmit} />
</Padding>
```

### Per-side padding

```tsx
import { Padding } from '@xaui/native-legacy/view'

;<Padding padding={{ top: 8, bottom: 16, left: 12, right: 12 }}>
  <ListItem title="Settings" />
</Padding>
```
