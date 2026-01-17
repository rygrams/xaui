# @xaui/progress

Activity indicator components for XAUI - A modern React Native UI library with Flutter-inspired API, smooth animations, and comprehensive design system.

## Installation

```bash
pnpm add @xaui/progress
```

## Components

- **CircularActivityIndicator**: A versatile activity indicator with three variants (ticks, bullets, spinner)

## CircularActivityIndicator

A flexible activity indicator component that supports three different visual styles through the `variant` prop.

### Basic Usage

```typescript
import { CircularActivityIndicator } from '@xaui/progress'
import { XUIProvider } from '@xaui/core'

function MyComponent() {
  return (
    <XUIProvider>
      <CircularActivityIndicator />
    </XUIProvider>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'ticks' \| 'bullets' \| 'spinner'` | `'spinner'` | Visual style of the activity indicator |
| `size` | `number` | `40` (spinner/bullets) / `20` (ticks) | Diameter of the indicator in pixels |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'primary'` | Theme color to use |
| `color` | `string` | - | Custom color (overrides themeColor) |
| `backgroundColor` | `string` | `'transparent'` | Background track color (only applies to spinner variant) |
| `disableAnimation` | `boolean` | `false` | Disable animations |

### Variants

#### Spinner (default)

A Material Design-inspired circular spinner with smooth animation.

```typescript
<CircularActivityIndicator variant="spinner" />

// With custom styling
<CircularActivityIndicator
  variant="spinner"
  size={50}
  themeColor="primary"
/>

// With custom color
<CircularActivityIndicator
  variant="spinner"
  color="#007AFF"
  size={60}
/>

// With background color
<CircularActivityIndicator
  variant="spinner"
  color="#007AFF"
  backgroundColor="#E5E5EA"
/>
```

**Design Details:**
- Material Design-inspired spinning animation
- Smooth acceleration/deceleration with bezier easing
- Optional background track color for better visibility
- Lightweight and efficient
- Default size: 40px

#### Ticks

A tick-based spinning indicator with opacity-based animation.

```typescript
<CircularActivityIndicator variant="ticks" />

// With custom styling
<CircularActivityIndicator
  variant="ticks"
  size={30}
  themeColor="success"
/>

// With custom color
<CircularActivityIndicator
  variant="ticks"
  color="#FF5733"
/>
```

**Design Details:**
- 8 tick marks arranged radially
- Active tick at 100% opacity, adjacent at 80%, others fade from 20-40%
- Creates rotation illusion through sequential opacity changes
- No physical rotation for optimal performance
- Default size: 20px

#### Bullets

A bullet-based orbital activity indicator with smooth ease-in-out animation.

```typescript
<CircularActivityIndicator variant="bullets" />

// With custom styling
<CircularActivityIndicator
  variant="bullets"
  size={60}
  themeColor="warning"
/>

// With custom color
<CircularActivityIndicator
  variant="bullets"
  color="#FF00FF"
  size={50}
/>
```

**Design Details:**
- 6 circular bullets orbiting around an invisible center
- Continuous 360-degree rotation
- Evenly spaced at 60° intervals
- Smooth ease-in-out animation for natural movement
- Transform-based rotation for smooth circular motion
- Default size: 40px

### Examples

#### Different Theme Colors

```typescript
<CircularActivityIndicator variant="spinner" themeColor="primary" />
<CircularActivityIndicator variant="ticks" themeColor="secondary" />
<CircularActivityIndicator variant="bullets" themeColor="success" />
<CircularActivityIndicator variant="spinner" themeColor="warning" />
<CircularActivityIndicator variant="ticks" themeColor="danger" />
```

#### Custom Sizes

```typescript
// Small spinner
<CircularActivityIndicator variant="spinner" size={24} />

// Medium ticks
<CircularActivityIndicator variant="ticks" size={32} />

// Large bullets
<CircularActivityIndicator variant="bullets" size={80} />
```

#### Custom Colors

```typescript
<CircularActivityIndicator variant="spinner" color="#007AFF" />
<CircularActivityIndicator variant="ticks" color="#34C759" />
<CircularActivityIndicator variant="bullets" color="#FF3B30" />

// Spinner with background track
<CircularActivityIndicator
  variant="spinner"
  color="#007AFF"
  backgroundColor="#E5F0FF"
/>
```

#### Without Animation

```typescript
<CircularActivityIndicator variant="spinner" disableAnimation={true} />
<CircularActivityIndicator variant="ticks" disableAnimation={true} />
<CircularActivityIndicator variant="bullets" disableAnimation={true} />
```

#### Combining Props

```typescript
<CircularActivityIndicator
  variant="bullets"
  size={70}
  themeColor="primary"
  disableAnimation={false}
/>

<CircularActivityIndicator
  variant="ticks"
  size={28}
  color="#FF9500"
/>

<CircularActivityIndicator
  variant="spinner"
  size={48}
  themeColor="success"
/>
```

## Accessibility

All components include proper accessibility attributes:

- `accessibilityRole="progressbar"`
- `accessibilityLabel` for screen readers

## TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```typescript
import type {
  CircularActivityIndicatorProps,
  ActivityIndicatorProps,
} from '@xaui/progress'
```

## Theme Integration

All components integrate with the XAUI theme system through `@xaui/core`:

```typescript
import { XUIProvider } from '@xaui/core'

function App() {
  return (
    <XUIProvider
      theme={{
        colors: {
          primary: {
            main: '#007AFF',
            foreground: '#FFFFFF',
            background: '#E5F0FF',
          },
        },
      }}
    >
      <CircularActivityIndicator variant="spinner" themeColor="primary" />
      <CircularActivityIndicator variant="ticks" themeColor="primary" />
      <CircularActivityIndicator variant="bullets" themeColor="primary" />
    </XUIProvider>
  )
}
```

## Performance

- Animations use the native driver when available for 60fps performance
- Optimized with `React.useCallback` and `useRef` to prevent unnecessary re-renders
- Efficient interpolation calculations for smooth visual transitions

## Testing

The package includes comprehensive test coverage:

- 100+ unit tests covering all component variants
- Props validation and type checking
- Animation behavior testing
- Theme integration testing
- Accessibility testing
- Variant switching tests

## License

MIT
