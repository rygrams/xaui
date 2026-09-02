# Row

Flutter-inspired horizontal flex layout. `Row` is `Flex` with `direction="horizontal"` pre-set.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { Row } from '@xaui/native-legacy/view'
```

## Props

| Prop                 | Type                                                                               | Default    | Description                                                              |
| -------------------- | ---------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `children`           | `ReactNode`                                                                        | —          | Content to render inside the row                                         |
| `mainAxisAlignment`  | `"start" \| "end" \| "center" \| "spaceBetween" \| "spaceAround" \| "spaceEvenly"` | `"start"`  | How to place children along the horizontal axis                          |
| `crossAxisAlignment` | `"start" \| "end" \| "center" \| "stretch"`                                        | `"center"` | How to place children along the vertical axis                            |
| `mainAxisSize`       | `"min" \| "max"`                                                                   | `"max"`    | Whether the row takes max or min horizontal space                        |
| `gap`                | `number`                                                                           | —          | Gap between children in logical pixels                                   |
| `wrap`               | `boolean`                                                                          | `false`    | Wrap children onto multiple lines when they overflow                     |
| `reversed`           | `boolean`                                                                          | `false`    | Reverse the row direction (right to left)                                |
| `flex`               | `number`                                                                           | —          | Flex factor applied to the row itself                                    |
| `style`              | `StyleProp<ViewStyle>` / `CSSProperties`                                           | —          | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`             | `string`                                                                           | —          | Test identifier for e2e tests                                            |

## Examples

### Basic row with gap

```tsx
import { Row } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Row gap={12} crossAxisAlignment="center">
  <View
    style={{ width: 48, height: 48, backgroundColor: '#6366f1', borderRadius: 24 }}
  />
  <View
    style={{ flex: 1, height: 16, backgroundColor: '#e2e8f0', borderRadius: 8 }}
  />
</Row>
```

### Space between

```tsx
import { Row } from '@xaui/native-legacy/view'

;<Row mainAxisAlignment="spaceBetween" crossAxisAlignment="center">
  <Typography>Label</Typography>
  <Switch value={enabled} onValueChange={setEnabled} />
</Row>
```

### Reversed row

```tsx
import { Row } from '@xaui/native-legacy/view'

;<Row gap={8} reversed>
  {items.map(item => (
    <Chip key={item.id} label={item.name} />
  ))}
</Row>
```
