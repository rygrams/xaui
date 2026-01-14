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
    primary: '#FF6B6B',
    onPrimary: '#FFFFFF',
    primarySurface: '#FFE5E5',
    secondary: '#4ECDC4',
    onSecondary: '#FFFFFF',
    secondarySurface: '#E0F7F6',
    default: '#2C3E50',
    onDefault: '#FFFFFF',
    defaultSurface: '#ECF0F1',
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
    primary: '#3B82F6',
    onPrimary: '#FFFFFF',
    primarySurface: '#DBEAFE',
    background: '#FFFFFF',
    onBackground: '#000000',
  },
}

const customDarkTheme = {
  colors: {
    primary: '#60A5FA',
    onPrimary: '#1F2937',
    primarySurface: '#1E3A8A',
    background: '#000000',
    onBackground: '#FFFFFF',
  },
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
    <View style={{ backgroundColor: theme.colors.primarySurface }}>
      <Text style={{ color: theme.colors.default }}>
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
const primary = theme.colors.primary
const onPrimary = theme.colors.onPrimary
const primarySurface = theme.colors.primarySurface

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

The theme uses a Material Design-inspired color system with a flat structure. Each color role has three related properties:
- Base color (e.g., `primary`) - The primary color for this role (string)
- On color (e.g., `onPrimary`) - Color for text/content displayed on the base color (string)
- Surface color (e.g., `primarySurface`) - Color for surfaces/containers using this role (string)

#### Brand Colors
- `theme.colors.primary` - Main primary brand color
- `theme.colors.onPrimary` - Text color on primary backgrounds
- `theme.colors.primarySurface` - Primary surface/container color

- `theme.colors.secondary` - Main secondary brand color
- `theme.colors.onSecondary` - Text color on secondary backgrounds
- `theme.colors.secondarySurface` - Secondary surface/container color

#### Semantic Colors
- `theme.colors.danger` - Main danger/error color
- `theme.colors.onDanger` - Text color on danger backgrounds
- `theme.colors.dangerSurface` - Danger surface/container color

- `theme.colors.warning` - Main warning/caution color
- `theme.colors.onWarning` - Text color on warning backgrounds
- `theme.colors.warningSurface` - Warning surface/container color

- `theme.colors.success` - Main success/positive color
- `theme.colors.onSuccess` - Text color on success backgrounds
- `theme.colors.successSurface` - Success surface/container color

#### Utility Colors
- `theme.colors.default` - Default text/content color
- `theme.colors.onDefault` - Text color on default backgrounds
- `theme.colors.defaultSurface` - Default surface/container color

#### Background
- `theme.colors.background` - Main background color
- `theme.colors.onBackground` - Text color on background

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

Pre-configured theme color objects with a flat structure. These are the default color palettes used by the built-in themes:

```typescript
import { themeColors, darkThemeColors } from '@xaui/core'

// Light theme colors (themeColors)
console.log(themeColors.primary)           // '#2563EB' (blue-600)
console.log(themeColors.onPrimary)         // '#FFFFFF' (white)
console.log(themeColors.primarySurface)    // '#DBEAFE' (blue-100)

console.log(themeColors.secondary)         // '#9333EA' (purple-600)
console.log(themeColors.danger)            // '#DC2626' (red-600)
console.log(themeColors.warning)           // '#D97706' (amber-600)
console.log(themeColors.success)           // '#16A34A' (green-600)
console.log(themeColors.default)           // '#FFFFFF' (white)
console.log(themeColors.background)        // '#FFFFFF' (white)
console.log(themeColors.onBackground)      // '#111827' (gray-900)

// Dark theme colors (darkThemeColors)
console.log(darkThemeColors.primary)       // '#3B82F6' (blue-500)
console.log(darkThemeColors.onPrimary)     // '#111827' (gray-900)
console.log(darkThemeColors.primarySurface)    // '#1E3A8A' (blue-900)

console.log(darkThemeColors.secondary)     // '#A855F7' (purple-500)
console.log(darkThemeColors.danger)        // '#EF4444' (red-500)
console.log(darkThemeColors.warning)       // '#F59E0B' (amber-500)
console.log(darkThemeColors.success)       // '#22C55E' (green-500)
console.log(darkThemeColors.default)       // '#E5E7EB' (gray-200)
console.log(darkThemeColors.background)    // '#111827' (gray-900)
console.log(darkThemeColors.onBackground)  // '#FFFFFF' (white)
```

You can use these directly in your custom theme configurations:

```typescript
import { XUIProvider, themeColors } from '@xaui/core'

const customTheme = {
  colors: {
    ...themeColors,
    primary: '#FF0000',
    onPrimary: '#FFFFFF',
    primarySurface: '#FFE5E5',
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

- **Colors**: Material Design-inspired color system with a flat structure. Each role has three related properties:
  - Base color (e.g., `primary`) - The primary color for this role
  - On color (e.g., `onPrimary`) - Color for text/content on the base color
  - Surface color (e.g., `primarySurface`) - Color for surfaces/containers using this role
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl (4px to 64px)
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full (0px to 9999px)
- **Border Width**: none, xs, sm, md, lg, xl (0px to 4px)
- **Font Sizes**: xs to 4xl (12px to 36px)
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Font Families**: body, heading, default (defaults to 'System' and 'monospace')
- **Shadows**: sm, md, lg, xl with React Native shadow properties

## License

MIT