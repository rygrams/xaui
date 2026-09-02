# Flexible

Like `Expanded`, but with a `fit` prop that controls whether the child must fill its allotted space (`tight`) or can be smaller (`loose`) — identical to Flutter's `Flexible` widget.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Flexible } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Flexible } from '@xaui/hybrid-legacy/flexible'
// or from the aggregated view export
import { Flexible } from '@xaui/hybrid-legacy/view'
```

## Props

| Prop       | Type                                     | Default    | Description                                                              |
| ---------- | ---------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `children` | `ReactNode`                              | —          | Content to render inside the flexible container                          |
| `flex`     | `number`                                 | `1`        | Flex factor — how much space to claim relative to siblings               |
| `fit`      | `"tight" \| "loose"`                     | `"loose"`  | `tight` fills all allotted space (like `Expanded`); `loose` allows the child to be smaller |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —          | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`   | `string`                                 | —          | Test identifier for e2e tests                                            |

### FlexFit

| Value     | Behaviour                                       |
| --------- | ----------------------------------------------- |
| `"loose"` | Child can be at most the allotted size (default) |
| `"tight"` | Child is forced to fill the allotted size        |

## Examples

### Loose fit — child can be smaller

```tsx
import { Row, Flexible } from '@xaui/native-legacy/view'
import { View } from 'react-native'

<Row>
  <Flexible flex={1}>
    <View style={{ height: 40, width: 40, backgroundColor: '#6366f1', borderRadius: 8 }} />
  </Flexible>
  <Flexible flex={2}>
    <View style={{ height: 40, width: 80, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  </Flexible>
</Row>
```

### Tight fit — child fills allotted space

Equivalent to `Expanded`:

```tsx
import { Row, Flexible } from '@xaui/native-legacy/view'
import { View } from 'react-native'

<Row gap={8}>
  <Flexible flex={1} fit="tight">
    <View style={{ height: 60, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
  </Flexible>
  <Flexible flex={2} fit="tight">
    <View style={{ height: 60, backgroundColor: '#38bdf8', borderRadius: 8 }} />
  </Flexible>
</Row>
```

### Mixed fit

One fixed-width child, one flexible:

```tsx
import { Row, Flexible } from '@xaui/native-legacy/view'

<Row>
  <Avatar size={40} />
  <Flexible fit="tight">
    <Typography numberOfLines={1}>{name}</Typography>
  </Flexible>
</Row>
```
