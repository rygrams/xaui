# @xaui/core

A modern React Native UI library with Flutter-inspired API, smooth animations powered by React Native Reanimated, and a comprehensive design system.

## Installation

```bash
pnpm add @xaui/core
```

## Features

- **Flutter-inspired API**: Intuitive component props like `padding`, `margin`, `borderRadius`
- **Powerful Theme System**: Dynamic theming with deep customization support
- **Smooth Animations**: Built on React Native Reanimated for native performance
- **Design System**: Integrated with @xaui/colors for consistent theming
- **TypeScript First**: Fully typed for excellent developer experience
- **Performance**: Optimized for mobile with native animations

## Theme System

### XUIProvider

Wrap your app with `XUIProvider` to enable theming throughout your application.

```typescript
import { XUIProvider } from '@xaui/core'

export default function App() {
  return (
    <XUIProvider>
      {/* Your app content */}
    </XUIProvider>
  )
}
```

### Custom Theme

You can provide a custom theme with partial overrides:

```typescript
import { XUIProvider } from '@xaui/core'

const customTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    text: {
      primary: '#2C3E50',
    },
  },
}

export default function App() {
  return (
    <XUIProvider theme={customTheme}>
      {/* Your app content */}
    </XUIProvider>
  )
}
```

### Dark Theme

Use the built-in dark theme:

```typescript
import { XUIProvider, darkTheme } from '@xaui/core'

export default function App() {
  return (
    <XUIProvider theme={darkTheme}>
      {/* Your app content */}
    </XUIProvider>
  )
}
```

## useXUITheme Hook

Access and modify theme colors dynamically using the `useXUITheme` hook.

### Basic Usage

```typescript
import { useXUITheme } from '@xaui/core'
import { View, Text } from 'react-native'

function MyComponent() {
  const theme = useXUITheme()

  return (
    <View style={{ backgroundColor: theme.background.primary.color }}>
      <Text style={{ color: theme.text.primary.color }}>
        Hello World
      </Text>
    </View>
  )
}
```

### Color Accessors

Each color accessor provides:
- `.color` - Get the current color value
- `.setColor(value)` - Update the color dynamically
- `.toString()` - Convert to string (useful for style objects)

```typescript
const theme = useXUITheme()

// Access colors
const primaryColor = theme.primary.color
const bgColor = theme.background.primary.color

// Update colors dynamically
theme.primary.setColor('#FF0000')
theme.text.primary.setColor('#333333')
```

### Available Color Accessors

#### Semantic Colors
- `theme.primary`
- `theme.secondary`
- `theme.success`
- `theme.warning`
- `theme.error`
- `theme.info`

#### Text Colors
- `theme.text.primary`
- `theme.text.secondary`
- `theme.text.tertiary`
- `theme.text.disabled`
- `theme.text.inverse`

#### Background Colors
- `theme.background.primary`
- `theme.background.secondary`
- `theme.background.tertiary`
- `theme.background.inverse`

#### Border Colors
- `theme.border.primary`
- `theme.border.secondary`
- `theme.border.focus`

### Dynamic Theme Example

```typescript
import { useXUITheme } from '@xaui/core'
import { View, Button, Text } from 'react-native'

function ThemeSwitcher() {
  const theme = useXUITheme()

  const toggleTheme = () => {
    // Toggle between light and dark primary colors
    const isDark = theme.primary.color === '#1E40AF'
    theme.primary.setColor(isDark ? '#3B82F6' : '#1E40AF')
    theme.background.primary.setColor(isDark ? '#FFFFFF' : '#1F2937')
    theme.text.primary.setColor(isDark ? '#1F2937' : '#F9FAFB')
  }

  return (
    <View style={{ backgroundColor: theme.background.primary.color, padding: 20 }}>
      <Text style={{ color: theme.text.primary.color, marginBottom: 10 }}>
        Current Theme
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  )
}
```

## Color Utilities

### colors

Access the full Tailwind-inspired color palette from @xaui/colors:

```typescript
import { colors } from '@xaui/core'

const blue500 = colors.blue[500]
const red600 = colors.red[600]
```

### getColor

Helper function to get colors by name and shade:

```typescript
import { getColor } from '@xaui/core'

const primaryBlue = getColor('blue', 500)
const errorRed = getColor('red', 600)
```

### themeColors & darkThemeColors

Pre-configured theme color objects:

```typescript
import { themeColors, darkThemeColors } from '@xaui/core'

console.log(themeColors.primary)        // '#2563EB'
console.log(darkThemeColors.primary)    // '#3B82F6'
```

## TypeScript Support

All exports are fully typed for excellent IntelliSense support:

```typescript
import type {
  XUITheme,
  XUIProviderProps,
  ThemeColors,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeShadows,
} from '@xaui/core'
```

## Theme Structure

The default theme includes:

- **Colors**: Semantic colors (primary, secondary, etc.) + text, background, and border colors
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl (4px to 64px)
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full
- **Font Sizes**: xs to 4xl (12px to 36px)
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Shadows**: sm, md, lg, xl with React Native shadow properties

## License

MIT