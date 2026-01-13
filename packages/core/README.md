# @xaui/core

A modern React Native component library strongly inspired by Flutter. Provides ready-to-use UI components with Flutter-like API, smooth animations powered by React Native Reanimated, and a comprehensive design system.

## Installation

```bash
pnpm add @xaui/core
```

## Features

- **Flutter-inspired Components**: Ready-to-use UI components with Flutter-like API and intuitive props (`padding`, `margin`, `borderRadius`)
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
    primary: {
      main: '#FF6B6B',
      foreground: '#FFFFFF',
      surface: '#FFE5E5',
    },
    secondary: {
      main: '#4ECDC4',
      foreground: '#FFFFFF',
      surface: '#E0F7F6',
    },
    default: {
      main: '#2C3E50',
      foreground: '#FFFFFF',
      surface: '#ECF0F1',
    },
  },
  fontFamilies: {
    body: 'Inter',
    heading: 'Poppins',
    default: 'Courier New',
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

### Automatic Light/Dark Theme Switching

The `XUIProvider` automatically switches between light and dark themes based on the system's color scheme:

```typescript
import { XUIProvider, theme, darkTheme } from '@xaui/core'

export default function App() {
  return (
    <XUIProvider theme={theme} darkTheme={darkTheme}>
      {/* Your app content will automatically switch between light and dark themes */}
    </XUIProvider>
  )
}
```

### Custom Light and Dark Themes

You can provide custom themes for both light and dark modes:

```typescript
import { XUIProvider } from '@xaui/core'

const customLightTheme = {
  colors: {
    primary: {
      main: '#3B82F6',
      foreground: '#FFFFFF',
      surface: '#DBEAFE',
    },
  },
  background: '#FFFFFF',
}

const customDarkTheme = {
  colors: {
    primary: {
      main: '#60A5FA',
      foreground: '#1F2937',
      surface: '#1E3A8A',
    },
  },
  background: '#000000',
}

export default function App() {
  return (
    <XUIProvider theme={customLightTheme} darkTheme={customDarkTheme}>
      {/* Automatically switches between custom light and dark themes */}
    </XUIProvider>
  )
}
```

### Dark Theme Only

To use only dark theme without automatic switching:

```typescript
import { XUIProvider, darkTheme } from '@xaui/core'

export default function App() {
  return (
    <XUIProvider theme={darkTheme}>
      {/* Your app content will always use dark theme */}
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
    <View style={{ backgroundColor: theme.primary.surface.color }}>
      <Text style={{ color: theme.default.main.color }}>
        Hello World
      </Text>
    </View>
  )
}
```

### Color Accessors

Each color role (primary, secondary, danger, etc.) provides three properties following Material Design patterns:
- `.main` - The main color for the role
- `.foreground` - The color for content displayed on the main color
- `.surface` - The color for surfaces/containers using this role

Each property accessor provides:
- `.color` - Get the current color value
- `.setColor(value)` - Update the color dynamically
- `.toString()` - Convert to string (useful for style objects)

You can also set an entire color role at once using `.setRole()`:

```typescript
const theme = useXUITheme()

// Access individual colors
const primaryMain = theme.primary.main.color
const primaryForeground = theme.primary.foreground.color
const primarySurface = theme.primary.surface.color

// Update individual colors
theme.primary.main.setColor('#FF0000')
theme.primary.foreground.setColor('#FFFFFF')
theme.primary.surface.setColor('#FFE5E5')

// Or update entire role at once
theme.primary.setRole({
  main: '#FF0000',
  foreground: '#FFFFFF',
  surface: '#FFE5E5',
})
```

### Available Color Roles

The theme uses a Material Design-inspired color system. Each color role has three properties:
- `.main` - The primary color for this role
- `.foreground` - Color for text/content displayed on the main color
- `.surface` - Color for surfaces/containers using this role

#### Brand Colors
- `theme.primary` - Primary brand color role
  - `theme.primary.main` - Main primary color
  - `theme.primary.foreground` - Text color on primary backgrounds
  - `theme.primary.surface` - Primary surface/container color

- `theme.secondary` - Secondary brand color role
  - `theme.secondary.main` - Main secondary color
  - `theme.secondary.foreground` - Text color on secondary backgrounds
  - `theme.secondary.surface` - Secondary surface/container color

#### Semantic Colors
- `theme.danger` - Error/destructive action color role
  - `theme.danger.main` - Main danger color
  - `theme.danger.foreground` - Text color on danger backgrounds
  - `theme.danger.surface` - Danger surface/container color

- `theme.warning` - Warning/caution color role
  - `theme.warning.main` - Main warning color
  - `theme.warning.foreground` - Text color on warning backgrounds
  - `theme.warning.surface` - Warning surface/container color

- `theme.success` - Success/positive color role
  - `theme.success.main` - Main success color
  - `theme.success.foreground` - Text color on success backgrounds
  - `theme.success.surface` - Success surface/container color

#### Utility Colors
- `theme.default` - Default color role
  - `theme.default.main` - Default text/content color
  - `theme.default.foreground` - Text color on default backgrounds
  - `theme.default.surface` - Default surface/container color

### Dynamic Theme Example

```typescript
import { useXUITheme } from '@xaui/core'
import { View, Button, Text } from 'react-native'

function ThemeSwitcher() {
  const theme = useXUITheme()

  const toggleTheme = () => {
    // Toggle between light and dark theme colors
    const isDark = theme.primary.main.color === '#1E40AF'

    // Update individual colors
    theme.primary.main.setColor(isDark ? '#3B82F6' : '#1E40AF')
    theme.primary.surface.setColor(isDark ? '#DBEAFE' : '#1F2937')
    theme.default.main.setColor(isDark ? '#F9FAFB' : '#1F2937')

    // Or update entire role at once
    theme.primary.setRole({
      main: isDark ? '#3B82F6' : '#1E40AF',
      foreground: '#FFFFFF',
      surface: isDark ? '#DBEAFE' : '#1F2937',
    })
  }

  return (
    <View style={{ backgroundColor: theme.primary.surface.color, padding: 20 }}>
      <Text style={{ color: theme.default.main.color, marginBottom: 10 }}>
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

Pre-configured theme color objects with ColorRole structure:

```typescript
import { themeColors, darkThemeColors } from '@xaui/core'

console.log(themeColors.primary.main)           // '#2563EB'
console.log(themeColors.primary.foreground)     // '#FFFFFF'
console.log(themeColors.primary.surface)        // '#DBEAFE'

console.log(darkThemeColors.primary.main)       // '#3B82F6'
console.log(darkThemeColors.primary.foreground) // '#1F2937'
console.log(darkThemeColors.primary.surface)    // '#1E3A8A'
```

## TypeScript Support

All exports are fully typed for excellent IntelliSense support:

```typescript
import type {
  XUITheme,
  XUIProviderProps,
  ThemeColors,
  ColorRole,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeFontFamilies,
  ThemeShadows,
} from '@xaui/core'
```

## Theme Structure

The default theme includes:

- **Colors**: Material Design-inspired color system with color roles (primary, secondary, danger, warning, success, default). Each role has three properties:
  - `main` - The primary color for this role
  - `foreground` - Color for text/content on the main color
  - `surface` - Color for surfaces/containers using this role
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl (4px to 64px)
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full
- **Font Sizes**: xs to 4xl (12px to 36px)
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Font Families**: body, heading, default (defaults to 'System' and 'monospace')
- **Shadows**: sm, md, lg, xl with React Native shadow properties

## License

MIT