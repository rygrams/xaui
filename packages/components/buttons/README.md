# @xaui/buttons

Button components for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/buttons @xaui/core @xaui/progress
```

## Components

- **Button** - Versatile button component with multiple variants and loading states
- **IconButton** - Icon-only button component optimized for actions

## Button

A comprehensive button component with support for multiple variants, sizes, loading states, and ripple effects.

### Basic Usage

```tsx
import { Button } from '@xaui/buttons'

function App() {
  return (
    <Button themeColor="primary" onPress={() => console.log('Pressed')}>
      Click me
    </Button>
  )
}
```

### Variants

The Button component supports 6 different variants:

```tsx
<Button variant="solid">Solid Button</Button>
<Button variant="outlined">Outlined Button</Button>
<Button variant="flat">Flat Button</Button>
<Button variant="light">Light Button</Button>
<Button variant="elevated">Elevated Button</Button>
<Button variant="faded">Faded Button</Button>
```

- **solid** (default) - Solid background with theme color
- **outlined** - Transparent background with border
- **flat** - Theme background color
- **light** - Transparent background (subtle hover effect)
- **elevated** - Solid background with shadow
- **faded** - Semi-transparent background with border

### Theme Colors

```tsx
<Button themeColor="primary">Primary</Button>
<Button themeColor="secondary">Secondary</Button>
<Button themeColor="tertiary">Tertiary</Button>
<Button themeColor="success">Success</Button>
<Button themeColor="warning">Warning</Button>
<Button themeColor="danger">Danger</Button>
<Button themeColor="default">Default</Button>
```

### Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Border Radius

```tsx
<Button radius="none">No Radius</Button>
<Button radius="sm">Small Radius</Button>
<Button radius="md">Medium Radius</Button>
<Button radius="lg">Large Radius</Button>
<Button radius="full">Full Radius</Button>
```

### Loading State

```tsx
<Button isLoading spinnerPlacement="start">
  Loading...
</Button>

<Button isLoading spinnerPlacement="end">
  Loading...
</Button>

<Button isLoading spinnerType="ticks">
  Loading...
</Button>
```

Spinner types:
- **spinner** (default) - Circular spinner
- **ticks** - Tick-based spinner
- **bullets** - Bullet-based spinner

### With Icons

```tsx
import { PlusIcon, ArrowRightIcon } from 'your-icon-library'

<Button
  themeColor="primary"
  startContent={<PlusIcon />}
>
  Add Item
</Button>

<Button
  themeColor="primary"
  endContent={<ArrowRightIcon />}
>
  Next
</Button>
```

### States

```tsx
// Disabled
<Button isDisabled>Disabled Button</Button>

// Full Width
<Button fullWidth>Full Width Button</Button>

// Loading
<Button isLoading>Loading...</Button>
```

### Ripple Effect

Enable Material Design-like ripple effect on press:

```tsx
<Button enableRipple themeColor="primary">
  Press me for ripple
</Button>
```

### Custom Styling

```tsx
<Button
  themeColor="primary"
  textStyle={{ fontWeight: 'bold', fontSize: 18 }}
  style={{ marginTop: 20 }}
>
  Custom Styled Button
</Button>
```

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content (required) |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'default'` | Theme color |
| `variant` | `'solid' \| 'outlined' \| 'flat' \| 'light' \| 'elevated' \| 'faded'` | `'solid'` | Button variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `startContent` | `ReactNode` | - | Content before text |
| `endContent` | `ReactNode` | - | Content after text |
| `spinnerType` | `'ticks' \| 'bullets' \| 'spinner'` | `'spinner'` | Loading spinner type |
| `spinnerPlacement` | `'start' \| 'end'` | `'start'` | Spinner placement |
| `fullWidth` | `boolean` | `false` | Full width button |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `isLoading` | `boolean` | `false` | Loading state |
| `enableRipple` | `boolean` | `false` | Enable ripple effect |
| `textStyle` | `TextStyle` | - | Custom text style |
| `style` | `ViewStyle` | - | Custom container style |
| `onPress` | `(event: GestureResponderEvent) => void` | - | Press handler |
| `onLongPress` | `(event: GestureResponderEvent) => void` | - | Long press handler |
| `onPressIn` | `(event: GestureResponderEvent) => void` | - | Press in handler |
| `onPressOut` | `(event: GestureResponderEvent) => void` | - | Press out handler |

---

## IconButton

A specialized button component designed for icon-only actions. Default variant is `light` (transparent).

### Basic Usage

```tsx
import { IconButton } from '@xaui/buttons'
import { HeartIcon } from 'your-icon-library'

function App() {
  return (
    <IconButton
      icon={<HeartIcon />}
      themeColor="danger"
      onPress={() => console.log('Liked')}
    />
  )
}
```

### Variants

```tsx
<IconButton icon={<HeartIcon />} variant="solid" themeColor="danger" />
<IconButton icon={<HeartIcon />} variant="outlined" themeColor="danger" />
<IconButton icon={<HeartIcon />} variant="flat" themeColor="danger" />
<IconButton icon={<HeartIcon />} variant="light" themeColor="danger" />
<IconButton icon={<HeartIcon />} variant="faded" themeColor="danger" />
```

### Sizes

IconButton automatically adjusts icon size based on button size:

```tsx
<IconButton icon={<HeartIcon />} size="xs" /> {/* 28x28px, icon: 16px */}
<IconButton icon={<HeartIcon />} size="sm" /> {/* 32x32px, icon: 18px */}
<IconButton icon={<HeartIcon />} size="md" /> {/* 40x40px, icon: 20px */}
<IconButton icon={<HeartIcon />} size="lg" /> {/* 48x48px, icon: 24px */}
```

### Circular Buttons

```tsx
<IconButton
  icon={<HeartIcon />}
  radius="full"
  variant="solid"
  themeColor="danger"
/>
```

### With Ripple Effect

```tsx
<IconButton
  icon={<HeartIcon />}
  enableRipple
  radius="full"
  variant="solid"
  themeColor="danger"
/>
```

### Loading State

```tsx
<IconButton
  icon={<HeartIcon />}
  isLoading
  themeColor="danger"
/>
```

### Example with react-native-svg

```tsx
import Svg, { Path } from 'react-native-svg'

const HeartIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

<IconButton
  icon={<HeartIcon />}
  themeColor="danger"
  variant="light"
/>
```

### IconButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement` | - | Icon element (required) |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'default'` | Theme color |
| `variant` | `'solid' \| 'outlined' \| 'flat' \| 'light' \| 'faded'` | `'light'` | Button variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `fullWidth` | `boolean` | `false` | Full width button |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `isLoading` | `boolean` | `false` | Loading state |
| `enableRipple` | `boolean` | `false` | Enable ripple effect |
| `style` | `ViewStyle` | - | Custom container style |
| `onPress` | `(event: GestureResponderEvent) => void` | - | Press handler |
| `onLongPress` | `(event: GestureResponderEvent) => void` | - | Long press handler |
| `onPressIn` | `(event: GestureResponderEvent) => void` | - | Press in handler |
| `onPressOut` | `(event: GestureResponderEvent) => void` | - | Press out handler |

---

## Advanced Examples

### Button Group

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <Button themeColor="primary" variant="solid">Save</Button>
  <Button themeColor="default" variant="outlined">Cancel</Button>
</View>
```

### Action Buttons

```tsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <IconButton
    icon={<EditIcon />}
    themeColor="primary"
    variant="light"
    onPress={() => console.log('Edit')}
  />
  <IconButton
    icon={<DeleteIcon />}
    themeColor="danger"
    variant="light"
    onPress={() => console.log('Delete')}
  />
  <IconButton
    icon={<ShareIcon />}
    themeColor="default"
    variant="light"
    onPress={() => console.log('Share')}
  />
</View>
```

### Form Submit Button

```tsx
<Button
  themeColor="primary"
  fullWidth
  isLoading={isSubmitting}
  onPress={handleSubmit}
>
  Submit Form
</Button>
```

### Floating Action Button

```tsx
<IconButton
  icon={<PlusIcon />}
  themeColor="primary"
  variant="elevated"
  radius="full"
  size="lg"
  enableRipple
  style={{
    position: 'absolute',
    bottom: 20,
    right: 20,
  }}
  onPress={() => console.log('Add')}
/>
```

## Theme Integration

Both Button and IconButton integrate seamlessly with the XAUI theme system via `@xaui/core`:

```tsx
import { XUIProvider } from '@xaui/core'
import { Button } from '@xaui/buttons'

function App() {
  return (
    <XUIProvider>
      <Button themeColor="primary">
        Themed Button
      </Button>
    </XUIProvider>
  )
}
```

## Accessibility

Both components support standard React Native accessibility props:

```tsx
<Button
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
  accessibilityRole="button"
>
  Submit
</Button>

<IconButton
  icon={<HeartIcon />}
  accessibilityLabel="Like"
  accessibilityHint="Double tap to like this item"
  accessibilityRole="button"
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { ButtonProps, IconButtonProps } from '@xaui/buttons'
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## License

MIT

## Related Packages

- [@xaui/core](../core) - Core theme system and provider
- [@xaui/progress](../progress) - Progress indicators and spinners
- [@xaui/colors](../colors) - Color palette system
