# Align

Aligns a child within available space using a named position or fractional `{ x, y }` coordinates — identical to Flutter's `Align` widget. `Center` is `Align` preconfigured with `alignment="center"`.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { Align } from '@xaui/native-legacy/view'
```

## Props

| Prop        | Type                                     | Default | Description                                                                                |
| ----------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `alignment` | `Alignment`                              | —       | Where to place the child — named position or `{ x, y }` coordinates from 0 to 1 (required) |
| `children`  | `ReactNode`                              | —       | Content to align inside the container                                                      |
| `style`     | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`)                   |
| `testID`    | `string`                                 | —       | Test identifier (hybrid only)                                                              |

### Named alignment values

| Value            | Position                           |
| ---------------- | ---------------------------------- |
| `"center"`       | Centered                           |
| `"topLeft"`      | Top-left corner                    |
| `"topCenter"`    | Top edge, horizontally centered    |
| `"topRight"`     | Top-right corner                   |
| `"centerLeft"`   | Left edge, vertically centered     |
| `"centerRight"`  | Right edge, vertically centered    |
| `"bottomLeft"`   | Bottom-left corner                 |
| `"bottomCenter"` | Bottom edge, horizontally centered |
| `"bottomRight"`  | Bottom-right corner                |

## Examples

### Top-right alignment

```tsx
import { Align } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Align alignment="topRight">
  <View
    style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }}
  />
</Align>
```

### Custom coordinates

Child placed at 25% from left and 75% from top.

```tsx
import { Align } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Align alignment={{ x: 0.25, y: 0.75 }}>
  <View
    style={{ width: 40, height: 40, backgroundColor: '#f43f5e', borderRadius: 20 }}
  />
</Align>
```

### Badge overlay

```tsx
import { Align } from '@xaui/native-legacy/view'

;<Align alignment="topRight">
  <Badge count={3} />
</Align>
```
