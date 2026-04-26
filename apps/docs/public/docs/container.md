# Container

Flutter-inspired layout container. Renders `View` by default, switches to `Pressable` automatically when a press handler is provided.

```bash
pnpm add @xaui/native
```

**React Native**
```ts
import { Container } from '@xaui/native/view'
```

**Web / Hybrid**
```ts
import { Container } from '@xaui/hybrid/container'
// or from the aggregated view export
import { Container } from '@xaui/hybrid/view'
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content inside |
| `width` | `number \| \`${number}%\`` | Width |
| `height` | `number \| \`${number}%\`` | Height |
| `minWidth` | `number` | Minimum width |
| `maxWidth` | `number` | Maximum width |
| `minHeight` | `number` | Minimum height |
| `maxHeight` | `number` | Maximum height |
| `aspectRatio` | `number` | Width-to-height ratio |
| `flex` | `number` | Flex factor |
| `padding` | `EdgeInsets` | Inner spacing — number or `{ top, bottom, left, right, horizontal, vertical }` |
| `margin` | `EdgeInsets` | Outer spacing — same format |
| `alignment` | `Alignment` | Child alignment — `'center'`, `'topLeft'`, `'bottomRight'`… or `{ x, y }` |
| `color` | `string` | Background color |
| `border` | `Border` | Uniform `{ width, color, style }` or per-side `{ top, left, … }` |
| `borderRadius` | `BorderRadius` | Number or `{ topLeft, topRight, bottomLeft, bottomRight }` |
| `shadow` | `ShadowConfig` | `{ color, offset: { x, y }, blur, spread, opacity }` |
| `clip` | `boolean` | Clip children to bounds |
| `transform` | `TransformConfig` | `{ rotate, scale, translateX, translateY, … }` |
| `opacity` | `number` | 0–1 |
| `disabled` | `boolean` | Disables press handlers |
| `onPress` | `() => void` | Tap |
| `onLongPress` | `() => void` | Long press (500 ms) |
| `onPressIn` | `() => void` | Press start |
| `onPressOut` | `() => void` | Press end |
| `style` | `StyleProp<ViewStyle>` (native) / `CSSProperties` (hybrid) | Raw style override |
| `className` | `string` | Tailwind / CSS class names **(hybrid only)** |
| `accessibilityLabel` | `string` | Screen reader label **(native only)** |
| `ariaLabel` | `string` | ARIA label **(hybrid only)** |
| `role` | `string` | ARIA role **(hybrid only)** |
| `testID` | `string` | Test identifier |

## Example

```tsx
<Container
  color="#ffffff"
  padding={16}
  borderRadius={12}
  shadow={{ offset: { x: 0, y: 4 }, blur: 16, opacity: 0.1 }}
  onPress={() => console.log('pressed')}
>
  <Text style={{ fontWeight: '600' }}>Pressable card</Text>
</Container>
```
