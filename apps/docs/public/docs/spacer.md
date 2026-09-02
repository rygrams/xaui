# Spacer

Invisible flexible spacer that absorbs remaining space inside a `Row` or `Column`. It is equivalent to Flutter's `Spacer` widget — a shorthand for `Expanded` with no visible child.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Spacer } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Spacer } from '@xaui/hybrid-legacy/spacer'
// or from the aggregated view export
import { Spacer } from '@xaui/hybrid-legacy/view'
```

## Props

| Prop    | Type                                     | Default | Description                                                              |
| ------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `flex`  | `number`                                 | `1`     | Flex factor — how much remaining space to absorb                         |
| `style` | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |

## Examples

### Push items to opposite ends

```tsx
import { Row, Spacer } from '@xaui/native-legacy/view'

<Row>
  <Typography>Left</Typography>
  <Spacer />
  <Typography>Right</Typography>
</Row>
```

### Weighted spacing

```tsx
import { Row, Spacer } from '@xaui/native-legacy/view'

<Row>
  <Typography>Start</Typography>
  <Spacer flex={2} />
  <Typography>Middle</Typography>
  <Spacer flex={1} />
  <Typography>End</Typography>
</Row>
```

### Vertical padding between sections

```tsx
import { Column, Spacer } from '@xaui/native-legacy/view'

<Column>
  <Header />
  <Spacer flex={1} />
  <Footer />
</Column>
```
