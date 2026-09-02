# Center

Centers a child horizontally and vertically within available space. `Center` is `Align` preconfigured with `alignment="center"` — identical to Flutter's `Center` widget.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Center } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Center } from '@xaui/hybrid-legacy/center'
// or from the aggregated view export
import { Center } from '@xaui/hybrid-legacy/view'
```

## Props

| Prop       | Type                                     | Default | Description                                                              |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `children` | `ReactNode`                              | —       | Content to center                                                        |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`   | `string`                                 | —       | Test identifier (hybrid only)                                            |

## Examples

### Basic centering

```tsx
import { Center } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Center>
  <View
    style={{ width: 80, height: 80, backgroundColor: '#6366f1', borderRadius: 40 }}
  />
</Center>
```

### Full-screen loading indicator

```tsx
import { Center } from '@xaui/native-legacy/view'
import { ActivityIndicator } from 'react-native'

;<Center>
  <ActivityIndicator size="large" />
</Center>
```

### Empty state

```tsx
import { Center, Column } from '@xaui/native-legacy/view'

;<Center>
  <Column crossAxisAlignment="center" gap={12}>
    <EmptyIcon />
    <Typography>Nothing here yet</Typography>
  </Column>
</Center>
```
