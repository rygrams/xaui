# SizedBox

Flutter-inspired fixed-size box. Use it to constrain dimensions, add blank spacing between elements, fill remaining space (`expand`), or collapse to nothing (`shrink`).

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { SizedBox } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { SizedBox } from '@xaui/hybrid-legacy/sized-box'
// or from the aggregated view export
import { SizedBox } from '@xaui/hybrid-legacy/view'
```

## Props

| Prop       | Type                                     | Default | Description                                                                               |
| ---------- | ---------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `width`    | `number`                                 | —       | Width in logical pixels                                                                   |
| `height`   | `number`                                 | —       | Height in logical pixels                                                                  |
| `expand`   | `boolean`                                | `false` | Fill all available space — `flex: 1 + alignSelf: stretch` (Flutter `Expanded` equivalent) |
| `shrink`   | `boolean`                                | `false` | Collapse to zero size (Flutter `SizedBox.shrink()` equivalent)                            |
| `children` | `ReactNode`                              | —       | Optional content                                                                          |
| `style`    | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`)                  |
| `testID`   | `string`                                 | —       | Test identifier (native: `testID`, hybrid: `data-testid`)                                 |

## Examples

### Fixed spacer

```tsx
<Column>
  <Typography>Section A</Typography>
  <SizedBox height={32} />
  <Typography>Section B</Typography>
</Column>
```

### Fixed-size container

```tsx
<SizedBox width={80} height={80}>
  <View style={{ flex: 1, backgroundColor: '#4f46e5', borderRadius: 8 }} />
</SizedBox>
```

### Expanded — fill remaining space

```tsx
<Row>
  <SizedBox width={48} height={48} />
  <SizedBox expand />
</Row>
```

### Shrink — zero size

```tsx
<SizedBox shrink />
```
