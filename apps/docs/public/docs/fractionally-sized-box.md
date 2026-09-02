# FractionallySizedBox

Flutter-inspired box that sizes its child as a fraction of the parent's dimensions — equivalent to `FractionallySizedBox`. `widthFactor: 0.5` = child is 50% of parent width.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { FractionallySizedBox } from '@xaui/native-legacy/view'
```

## Props

| Prop           | Type                                     | Default | Description                                                                       |
| -------------- | ---------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `widthFactor`  | `number`                                 | —       | Fraction of the parent width (0–1). When undefined, child chooses its own width   |
| `heightFactor` | `number`                                 | —       | Fraction of the parent height (0–1). When undefined, child chooses its own height |
| `alignment`    | `Alignment`                              | —       | How to align the child (topLeft, center, bottomRight, { x, y })                   |
| `children`     | `ReactNode`                              | —       | Optional content                                                                  |
| `style`        | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`)          |
| `testID`       | `string`                                 | —       | Test identifier (native: `testID`, hybrid: `data-testid`)                         |

## Examples

### Half width

```tsx
<FractionallySizedBox widthFactor={0.5}>
  <View style={{ backgroundColor: '#6b21a8', height: 40, borderRadius: 8 }} />
</FractionallySizedBox>
```

### Centered fraction

```tsx
<FractionallySizedBox widthFactor={0.5} heightFactor={0.5} alignment="center">
  <View style={{ backgroundColor: '#0891b2', borderRadius: 8 }} />
</FractionallySizedBox>
```
