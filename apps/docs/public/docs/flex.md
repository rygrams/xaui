# Flex

Flutter-inspired generic flex container. Use `Flex` when you need full control over direction, alignment, gap, and wrapping. For the common cases use `Row` or `Column` directly.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { Flex } from '@xaui/native-legacy/view'
```

## Props

| Prop                 | Type                                                                               | Default    | Description                                                              |
| -------------------- | ---------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `direction`          | `"horizontal" \| "vertical"`                                                       | —          | Axis direction — horizontal for row, vertical for column                 |
| `children`           | `ReactNode`                                                                        | —          | Content to render inside the flex container                              |
| `mainAxisAlignment`  | `"start" \| "end" \| "center" \| "spaceBetween" \| "spaceAround" \| "spaceEvenly"` | `"start"`  | How to place children along the main axis                                |
| `crossAxisAlignment` | `"start" \| "end" \| "center" \| "stretch"`                                        | `"center"` | How to place children along the cross axis                               |
| `mainAxisSize`       | `"min" \| "max"`                                                                   | `"max"`    | Whether the container takes max or min space in the main axis            |
| `gap`                | `number`                                                                           | —          | Gap in logical pixels between children                                   |
| `wrap`               | `boolean`                                                                          | `false`    | Wrap children onto multiple lines when they overflow                     |
| `reversed`           | `boolean`                                                                          | `false`    | Reverse the layout direction                                             |
| `flex`               | `number`                                                                           | —          | Flex factor applied to the container itself                              |
| `style`              | `StyleProp<ViewStyle>` / `CSSProperties`                                           | —          | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`             | `string`                                                                           | —          | Test identifier for e2e tests                                            |

## Examples

### Row with space between

```tsx
import { Flex } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Flex direction="horizontal" mainAxisAlignment="spaceBetween" gap={8}>
  <View
    style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }}
  />
  <View
    style={{ width: 60, height: 60, backgroundColor: '#8b5cf6', borderRadius: 8 }}
  />
  <View
    style={{ width: 60, height: 60, backgroundColor: '#a855f7', borderRadius: 8 }}
  />
</Flex>
```

### Vertical stack centered

```tsx
import { Flex } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Flex direction="vertical" crossAxisAlignment="center" gap={12}>
  <View
    style={{ width: 120, height: 40, backgroundColor: '#0ea5e9', borderRadius: 8 }}
  />
  <View
    style={{ width: 80, height: 40, backgroundColor: '#38bdf8', borderRadius: 8 }}
  />
</Flex>
```

### Wrapping chips

```tsx
import { Flex } from '@xaui/native-legacy/view'

;<Flex direction="horizontal" wrap gap={8}>
  {tags.map(tag => (
    <Chip key={tag} label={tag} />
  ))}
</Flex>
```
