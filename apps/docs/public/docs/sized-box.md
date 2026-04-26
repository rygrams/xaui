# SizedBox

Flutter-inspired fixed-size box. Use it to constrain dimensions, add blank spacing between elements, fill remaining space (`expand`), or collapse to nothing (`shrink`).

```bash
pnpm add @xaui/native
```

**React Native**
```ts
import { SizedBox } from '@xaui/native/view'
```

**Web / Hybrid**
```ts
import { SizedBox } from '@xaui/hybrid/sized-box'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | — | Width in logical pixels |
| `height` | `number` | — | Height in logical pixels |
| `expand` | `boolean` | `false` | Fill all available space — `flex: 1 + alignSelf: stretch` (Flutter `Expanded` equivalent) |
| `shrink` | `boolean` | `false` | Collapse to zero size (Flutter `SizedBox.shrink()` equivalent) |
| `children` | `ReactNode` | — | Optional content |

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
