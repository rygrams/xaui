# Wrap

Flex container that automatically wraps children onto the next line when they overflow — identical to Flutter's `Wrap` widget. Use it for tag lists, chip groups, and any collection that needs to reflow.

```bash
pnpm add @xaui/native-legacy
```

**React Native**

```ts
import { Wrap } from '@xaui/native-legacy/view'
```

**Web / Hybrid**

```ts
import { Wrap } from '@xaui/hybrid/wrap'
// or from the aggregated view export
import { Wrap } from '@xaui/hybrid/view'
```

## Props

| Prop           | Type                                                                        | Default        | Description                                               |
| -------------- | --------------------------------------------------------------------------- | -------------- | --------------------------------------------------------- |
| `children`     | `ReactNode`                                                                 | —              | Content to render inside the wrap container               |
| `direction`    | `"horizontal" \| "vertical"`                                                | `"horizontal"` | Primary axis direction                                    |
| `alignment`    | `"start" \| "end" \| "center" \| "spaceBetween" \| "spaceAround" \| "spaceEvenly"` | `"start"`      | Alignment of children within each run                     |
| `runAlignment` | `"start" \| "end" \| "center" \| "spaceBetween" \| "spaceAround" \| "spaceEvenly"` | `"start"`      | Alignment of runs along the cross axis                    |
| `spacing`      | `number`                                                                    | `0`            | Space between children along the main axis                |
| `runSpacing`   | `number`                                                                    | `0`            | Space between runs along the cross axis                   |
| `style`        | `StyleProp<ViewStyle>` / `CSSProperties`                                    | —              | Style override                                            |
| `testID`       | `string`                                                                    | —              | Test identifier for e2e tests                             |

## Examples

### Chip list

```tsx
import { Wrap } from '@xaui/native-legacy/view'
import { Chip } from '@xaui/native-legacy/chip'

const tags = ['React', 'TypeScript', 'Flutter', 'UI', 'Mobile']

<Wrap spacing={8} runSpacing={8}>
  {tags.map((tag) => <Chip key={tag} label={tag} />)}
</Wrap>
```

### Centered tags

```tsx
import { Wrap } from '@xaui/native-legacy/view'
import { View } from 'react-native'

<Wrap alignment="center" spacing={12} runSpacing={12}>
  {Array.from({ length: 7 }, (_, i) => (
    <View key={i} style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: 8 }} />
  ))}
</Wrap>
```

### Space-between runs

```tsx
import { Wrap } from '@xaui/native-legacy/view'

<Wrap spacing={8} runSpacing={16} runAlignment="spaceBetween">
  {skills.map((s) => <Badge key={s} label={s} />)}
</Wrap>
```
