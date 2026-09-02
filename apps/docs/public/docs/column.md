# Column

Flutter-inspired vertical flex layout. `Column` is `Flex` with `direction="vertical"` pre-set.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Column } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Column } from '@xaui/hybrid-legacy/column'
// or from the aggregated view export
import { Column } from '@xaui/hybrid-legacy/view'
```

## Props

| Prop                 | Type                                                                               | Default    | Description                                                              |
| -------------------- | ---------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `children`           | `ReactNode`                                                                        | —          | Content to render inside the column                                      |
| `mainAxisAlignment`  | `"start" \| "end" \| "center" \| "spaceBetween" \| "spaceAround" \| "spaceEvenly"` | `"start"`  | How to place children along the vertical axis                            |
| `crossAxisAlignment` | `"start" \| "end" \| "center" \| "stretch"`                                        | `"center"` | How to place children along the horizontal axis                          |
| `mainAxisSize`       | `"min" \| "max"`                                                                   | `"max"`    | Whether the column takes max or min vertical space                       |
| `gap`                | `number`                                                                           | —          | Gap between children in logical pixels                                   |
| `wrap`               | `boolean`                                                                          | `false`    | Wrap children when they overflow vertically                              |
| `reversed`           | `boolean`                                                                          | `false`    | Reverse the column direction (bottom to top)                             |
| `flex`               | `number`                                                                           | —          | Flex factor applied to the column itself                                 |
| `style`              | `StyleProp<ViewStyle>` / `CSSProperties`                                           | —          | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`             | `string`                                                                           | —          | Test identifier for e2e tests                                            |

## Examples

### Basic column

```tsx
import { Column } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Column gap={12} crossAxisAlignment="stretch">
  <View style={{ height: 48, backgroundColor: '#6366f1', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  <View style={{ height: 48, backgroundColor: '#a855f7', borderRadius: 8 }} />
</Column>
```

### Column centered on screen

```tsx
import { Column } from '@xaui/native-legacy/view'

;<Column mainAxisAlignment="center" crossAxisAlignment="center" gap={16}>
  <Logo />
  <Typography variant="h2">Welcome</Typography>
  <Button label="Get started" onPress={handleStart} />
</Column>
```

### Min-size column (wraps content)

```tsx
import { Column } from '@xaui/native-legacy/view'

;<Column mainAxisSize="min" gap={8}>
  <Label>Option A</Label>
  <Label>Option B</Label>
</Column>
```
