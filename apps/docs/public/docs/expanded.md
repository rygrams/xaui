# Expanded

Expands a child to fill the available space inside a `Row` or `Column`. The optional `flex` factor controls how much space this child claims relative to its siblings — identical to Flutter's `Expanded` widget.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Expanded } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Expanded } from '@xaui/hybrid/expanded'
// or from the aggregated view export
import { Expanded } from '@xaui/hybrid/view'
```

## Props

| Prop       | Type                                     | Default | Description                                                              |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `children` | `ReactNode`                              | —       | Content to render inside the expanded container                          |
| `flex`     | `number`                                 | `1`     | Flex factor — how much available space to take relative to siblings      |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`   | `string`                                 | —       | Test identifier for e2e tests                                            |

## Examples

### Equal distribution

Two children share available space equally inside a `Row`.

```tsx
import { Row, Expanded } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Row>
  <Expanded>
    <View style={{ height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
  </Expanded>
  <Expanded>
    <View style={{ height: 60, backgroundColor: '#8b5cf6', borderRadius: 8 }} />
  </Expanded>
</Row>
```

### Weighted distribution

Second child takes twice as much space (`flex={2}` vs `flex={1}`).

```tsx
import { Row, Expanded } from '@xaui/native-legacy/view'
import { View } from 'react-native'

;<Row gap={8}>
  <Expanded flex={1}>
    <View style={{ height: 60, backgroundColor: '#0ea5e9', borderRadius: 8 }} />
  </Expanded>
  <Expanded flex={2}>
    <View style={{ height: 60, backgroundColor: '#38bdf8', borderRadius: 8 }} />
  </Expanded>
</Row>
```

### Fill vertical space in a Column

```tsx
import { Column, Expanded } from '@xaui/native-legacy/view'

;<Column>
  <Header />
  <Expanded>
    <ScrollView>{/* main content */}</ScrollView>
  </Expanded>
  <Footer />
</Column>
```
