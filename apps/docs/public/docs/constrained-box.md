# ConstrainedBox

Flutter-inspired box that imposes min/max size constraints on its child — equivalent to `ConstrainedBox` + `BoxConstraints`. Use it to set lower and upper bounds on width and height without fixing an exact size.

```bash
pnpm add @xaui/native-legacy
```

```ts
import { ConstrainedBox } from '@xaui/native-legacy/view'
```

## Props

| Prop          | Type                                     | Default | Description                                                              |
| ------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `constraints` | `BoxConstraints`                         | —       | Size constraints: `{ minWidth?, maxWidth?, minHeight?, maxHeight? }`     |
| `children`    | `ReactNode`                              | —       | Optional content                                                         |
| `style`       | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`      | `string`                                 | —       | Test identifier (native: `testID`, hybrid: `data-testid`)                |

### BoxConstraints

| Field       | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `minWidth`  | `number` | Minimum width in logical pixels                              |
| `maxWidth`  | `number` | Maximum width in logical pixels (`Infinity` = unrestricted)  |
| `minHeight` | `number` | Minimum height in logical pixels                             |
| `maxHeight` | `number` | Maximum height in logical pixels (`Infinity` = unrestricted) |

## Examples

### Minimum width

```tsx
<ConstrainedBox constraints={{ minWidth: 200 }}>
  <View style={{ backgroundColor: '#6b21a8', height: 40, borderRadius: 8 }} />
</ConstrainedBox>
```

### Maximum width

```tsx
<ConstrainedBox constraints={{ maxWidth: 300 }}>
  <Typography>This text will wrap instead of stretching.</Typography>
</ConstrainedBox>
```

### Combined min/max constraints

```tsx
<ConstrainedBox
  constraints={{
    minWidth: 100,
    maxWidth: 250,
    minHeight: 60,
    maxHeight: 120,
  }}
>
  <View style={{ flex: 1, backgroundColor: '#0891b2', borderRadius: 8 }} />
</ConstrainedBox>
```
