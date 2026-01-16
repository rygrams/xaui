# @xaui/progress

Progress and activity indicator components for XAUI - A modern React Native UI library with Flutter-inspired API, smooth animations, and comprehensive design system.

## Installation

```bash
pnpm add @xaui/progress
```

## Components

- **CircularProgressIndicator**: A circular progress indicator with determinate and indeterminate modes
- **CupertinoActivityIndicator**: iOS-style spinning activity indicator

## Features

- **Flutter-inspired API**: Progress components with intuitive Flutter-like props
- **Theme Integration**: Seamlessly integrates with @xaui/core theme system
- **Smooth Animations**: Native animations using React Native Animated API
- **TypeScript First**: Fully typed for excellent developer experience
- **Customizable**: Extensive customization options with theme colors and custom colors
- **Multiple States**: Support for determinate and indeterminate progress states
- **StrokeCap Options**: Configure line cap styles (round, butt, square)

## CircularProgressIndicator

A versatile circular progress indicator that supports both determinate (with a specific value) and indeterminate (loading) modes.

### Basic Usage

```typescript
import { CircularProgressIndicator } from '@xaui/progress'
import { XUIProvider } from '@xaui/core'

function MyComponent() {
  return (
    <XUIProvider>
      <CircularProgressIndicator value={0.75} />
    </XUIProvider>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `40` | Diameter of the circular indicator in pixels |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'primary'` | Theme color to use |
| `value` | `number \| null \| undefined` | `undefined` | Progress value (0-1). If undefined/null, shows indeterminate mode |
| `color` | `string` | - | Custom color (overrides themeColor) |
| `backgroundColor` | `string` | - | Custom background track color |
| `strokeWidth` | `number` | `4` | Width of the progress stroke |
| `strokeCap` | `'round' \| 'butt' \| 'square'` | `'butt'` (determinate) / `'square'` (indeterminate) | Style of the stroke line caps |
| `isAnimate` | `boolean` | `true` | Enable/disable animations |

### Examples

#### Determinate Progress

```typescript
// 75% complete
<CircularProgressIndicator value={0.75} />

// With custom size and color
<CircularProgressIndicator
  value={0.5}
  size={60}
  themeColor="success"
  strokeWidth={6}
/>

// With rounded caps
<CircularProgressIndicator
  value={0.8}
  strokeCap="round"
/>
```

#### Indeterminate (Loading) State

```typescript
// Default spinning loader
<CircularProgressIndicator />

// With custom styling
<CircularProgressIndicator
  size={50}
  themeColor="primary"
  strokeWidth={5}
/>

// With custom color
<CircularProgressIndicator
  color="#FF5733"
  backgroundColor="#EEEEEE"
/>
```

#### Different Theme Colors

```typescript
<CircularProgressIndicator value={0.3} themeColor="primary" />
<CircularProgressIndicator value={0.5} themeColor="secondary" />
<CircularProgressIndicator value={0.7} themeColor="success" />
<CircularProgressIndicator value={0.8} themeColor="warning" />
<CircularProgressIndicator value={0.9} themeColor="danger" />
```

#### StrokeCap Variants

```typescript
// Rounded ends
<CircularProgressIndicator value={0.6} strokeCap="round" />

// Flat ends (default for determinate)
<CircularProgressIndicator value={0.6} strokeCap="butt" />

// Square ends extending beyond the arc
<CircularProgressIndicator value={0.6} strokeCap="square" />
```

#### Without Animation

```typescript
<CircularProgressIndicator
  value={0.5}
  isAnimate={false}
/>
```

## CupertinoActivityIndicator

An iOS-style spinning activity indicator with opacity-based animation that creates the illusion of rotation.

### Basic Usage

```typescript
import { CupertinoActivityIndicator } from '@xaui/progress'
import { XUIProvider } from '@xaui/core'

function MyComponent() {
  return (
    <XUIProvider>
      <CupertinoActivityIndicator />
    </XUIProvider>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `20` | Diameter of the indicator in pixels |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'primary'` | Theme color to use |
| `color` | `string` | - | Custom color (overrides themeColor) |
| `isAnimate` | `boolean` | `true` | Enable/disable spinning animation |

### Examples

#### Basic Spinner

```typescript
<CupertinoActivityIndicator />
```

#### Custom Size and Color

```typescript
<CupertinoActivityIndicator
  size={40}
  themeColor="primary"
/>
```

#### Different Theme Colors

```typescript
<CupertinoActivityIndicator themeColor="primary" />
<CupertinoActivityIndicator themeColor="secondary" />
<CupertinoActivityIndicator themeColor="success" />
<CupertinoActivityIndicator themeColor="warning" />
<CupertinoActivityIndicator themeColor="danger" />
```

#### Custom Color

```typescript
<CupertinoActivityIndicator
  color="#007AFF"
  size={30}
/>
```

#### Without Animation

```typescript
<CupertinoActivityIndicator
  isAnimate={false}
/>
```

## Design Details

### CircularProgressIndicator

- **Indeterminate Mode**: Material Design-inspired spinning animation with smooth acceleration/deceleration
- **Determinate Mode**: SVG-based arc rendering with smooth animated progress updates
- **StrokeCap Behavior**:
  - `butt`: Default for determinate mode, straight line ends
  - `round`: Rounded line ends, popular for modern UI
  - `square`: Extends slightly beyond the arc endpoints

### CupertinoActivityIndicator

- **8 Tick Design**: Follows iOS native activity indicator pattern
- **Opacity Animation**: Active tick at 100% opacity, adjacent tick at 80%, remaining ticks fade from 20-40%
- **No Physical Rotation**: Creates rotation illusion through sequential opacity changes
- **Lightweight**: Efficient animation without transform rotations

## Accessibility

Both components include proper accessibility attributes:

- `accessibilityRole="progressbar"`
- `accessibilityLabel` for screen readers
- `accessibilityValue` with min/max/now values (CircularProgressIndicator in determinate mode)

## TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```typescript
import type {
  CircularProgressIndicatorProps,
  CupertinoActivityIndicatorProps,
  StrokeCap,
} from '@xaui/progress'
```

## Theme Integration

Both components integrate with the XAUI theme system through `@xaui/core`:

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
      <CircularProgressIndicator themeColor="primary" value={0.5} />
      <CupertinoActivityIndicator themeColor="primary" />
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

- 59 unit tests covering all component variants
- Props validation and type checking
- Animation behavior testing
- Theme integration testing
- Accessibility testing

## License

MIT
