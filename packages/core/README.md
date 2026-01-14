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

Access theme values in your components using the `useXUITheme` hook.

### Basic Usage

```typescript
import { useXUITheme } from '@xaui/core'
import { View, Text } from 'react-native'

function MyComponent() {
  const theme = useXUITheme()

  return (
    <View style={{ backgroundColor: theme.colors.primary.surface }}>
      <Text style={{ color: theme.colors.default.main }}>
        Hello World
      </Text>
    </View>
  )
}
```

### Accessing Theme Properties

The theme object provides access to all design tokens:

```typescript
const theme = useXUITheme()

// Access colors
const primaryMain = theme.colors.primary.main
const primaryForeground = theme.colors.primary.foreground
const primarySurface = theme.colors.primary.surface

// Access spacing
const padding = theme.spacing.md

// Access border radius
const borderRadius = theme.borderRadius.lg

// Access border width
const borderWidth = theme.borderWidth.sm

// Access typography
const fontSize = theme.fontSizes.xl
const fontFamily = theme.fontFamilies.body
```

### Available Color Roles

The theme uses a Material Design-inspired color system. Each color role has three properties:
- `main` - The primary color for this role (string)
- `foreground` - Color for text/content displayed on the main color (string)
- `surface` - Color for surfaces/containers using this role (string)

#### Brand Colors
- `theme.colors.primary` - Primary brand color role
  - `theme.colors.primary.main` - Main primary color
  - `theme.colors.primary.foreground` - Text color on primary backgrounds
  - `theme.colors.primary.surface` - Primary surface/container color

- `theme.colors.secondary` - Secondary brand color role
  - `theme.colors.secondary.main` - Main secondary color
  - `theme.colors.secondary.foreground` - Text color on secondary backgrounds
  - `theme.colors.secondary.surface` - Secondary surface/container color

#### Semantic Colors
- `theme.colors.danger` - Error/destructive action color role
  - `theme.colors.danger.main` - Main danger color
  - `theme.colors.danger.foreground` - Text color on danger backgrounds
  - `theme.colors.danger.surface` - Danger surface/container color

- `theme.colors.warning` - Warning/caution color role
  - `theme.colors.warning.main` - Main warning color
  - `theme.colors.warning.foreground` - Text color on warning backgrounds
  - `theme.colors.warning.surface` - Warning surface/container color

- `theme.colors.success` - Success/positive color role
  - `theme.colors.success.main` - Main success color
  - `theme.colors.success.foreground` - Text color on success backgrounds
  - `theme.colors.success.surface` - Success surface/container color

#### Utility Colors
- `theme.colors.default` - Default color role
  - `theme.colors.default.main` - Default text/content color
  - `theme.colors.default.foreground` - Text color on default backgrounds
  - `theme.colors.default.surface` - Default surface/container color

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

Pre-configured theme color objects with ColorRole structure. These are the default color palettes used by the built-in themes:

```typescript
import { themeColors, darkThemeColors } from '@xaui/core'

// Light theme colors (themeColors)
console.log(themeColors.primary.main)           // '#2563EB' (blue-600)
console.log(themeColors.primary.foreground)     // '#FFFFFF' (white)
console.log(themeColors.primary.surface)        // '#DBEAFE' (blue-100)

console.log(themeColors.secondary.main)         // '#9333EA' (purple-600)
console.log(themeColors.danger.main)            // '#DC2626' (red-600)
console.log(themeColors.warning.main)           // '#D97706' (amber-600)
console.log(themeColors.success.main)           // '#16A34A' (green-600)
console.log(themeColors.default.main)           // '#FFFFFF' (white)
console.log(themeColors.background)             // '#FFFFFF' (white)

// Dark theme colors (darkThemeColors)
console.log(darkThemeColors.primary.main)       // '#3B82F6' (blue-500)
console.log(darkThemeColors.primary.foreground) // '#111827' (gray-900)
console.log(darkThemeColors.primary.surface)    // '#1E3A8A' (blue-900)

console.log(darkThemeColors.secondary.main)     // '#A855F7' (purple-500)
console.log(darkThemeColors.danger.main)        // '#EF4444' (red-500)
console.log(darkThemeColors.warning.main)       // '#F59E0B' (amber-500)
console.log(darkThemeColors.success.main)       // '#22C55E' (green-500)
console.log(darkThemeColors.default.main)       // '#E5E7EB' (gray-200)
console.log(darkThemeColors.background)         // '#111827' (gray-900)
```

You can use these directly in your custom theme configurations:

```typescript
import { XUIProvider, themeColors, darkThemeColors } from '@xaui/core'

const customTheme = {
  colors: {
    ...themeColors,
    primary: {
      main: '#FF0000',
      foreground: '#FFFFFF',
      surface: '#FFE5E5',
    },
  },
}

export default function App() {
  return (
    <XUIProvider theme={customTheme}>
      {/* Your app */}
    </XUIProvider>
  )
}
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
  ThemeBorderWidth,
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
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full (0px to 9999px)
- **Border Width**: none, xs, sm, md, lg, xl (0px to 4px)
- **Font Sizes**: xs to 4xl (12px to 36px)
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Font Families**: body, heading, default (defaults to 'System' and 'monospace')
- **Shadows**: sm, md, lg, xl with React Native shadow properties

## License

MIT