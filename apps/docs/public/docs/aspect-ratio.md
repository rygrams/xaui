# AspectRatio

Flutter-inspired box that forces its child to a specific aspect ratio — equivalent to `AspectRatio`. Set `ratio={16/9}` for a 16:9 container, `ratio={1}` for a perfect square.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { AspectRatio } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { AspectRatio } from '@xaui/hybrid/aspect-ratio'
// or from the aggregated view export
import { AspectRatio } from '@xaui/hybrid/view'
```

## Props

| Prop        | Type                                     | Default | Description                                                              |
| ----------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `ratio`     | `number`                                 | —       | Aspect ratio (width / height). **Required**                              |
| `alignment` | `Alignment`                              | —       | How to align the child (topLeft, center, bottomRight, { x, y })          |
| `clip`      | `boolean`                                | `false` | Whether to clip overflow                                                 |
| `children`  | `ReactNode`                              | —       | Optional content                                                         |
| `style`     | `StyleProp<ViewStyle>` / `CSSProperties` | —       | Style override (native: `StyleProp<ViewStyle>`, hybrid: `CSSProperties`) |
| `testID`    | `string`                                 | —       | Test identifier (native: `testID`, hybrid: `data-testid`)                |

## Examples

### 16:9 video thumbnail

```tsx
<AspectRatio ratio={16 / 9}>
  <Image
    source={{ uri: 'https://example.com/thumb.jpg' }}
    style={{ width: '100%', height: '100%' }}
  />
</AspectRatio>
```

### Square avatar

```tsx
<AspectRatio ratio={1} clip>
  <Image
    source={{ uri: 'https://example.com/avatar.jpg' }}
    style={{ width: '100%', height: '100%' }}
  />
</AspectRatio>
```

### With clip

```tsx
<AspectRatio ratio={16 / 9} clip>
  <View style={{ backgroundColor: '#0891b2', width: '100%', height: '100%' }} />
</AspectRatio>
```
