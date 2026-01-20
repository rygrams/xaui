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
import { XUIProvider } from '@xaui/core/theme'

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
import { XUIProvider } from '@xaui/core/theme'

const customTheme = {
  colors: {
    primary: {
      main: '#FF6B6B',
      foreground: '#FFFFFF',
      background: '#FFE5E5',
    },
    secondary: {
      main: '#4ECDC4',
      foreground: '#FFFFFF',
      background: '#E0F7F6',
    },
    default: {
      main: '#2C3E50',
      foreground: '#FFFFFF',
      background: '#ECF0F1',
    },
    background: '#FFFFFF',
    foreground: '#111827',
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
import { XUIProvider, theme, darkTheme } from '@xaui/core/theme'

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
import { XUIProvider } from '@xaui/core/theme'

const customLightTheme = {
  colors: {
    primary: {
      main: '#3B82F6',
      foreground: '#FFFFFF',
      background: '#DBEAFE',
    },
    background: '#FFFFFF',
    foreground: '#000000',
  },
}

const customDarkTheme = {
  colors: {
    primary: {
      main: '#60A5FA',
      foreground: '#1F2937',
      background: '#1E3A8A',
    },
    background: '#000000',
    foreground: '#FFFFFF',
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
import { XUIProvider, darkTheme } from '@xaui/core/theme'

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
import { useXUITheme } from '@xaui/core/theme'
import { View, Text } from 'react-native'

function MyComponent() {
  const theme = useXUITheme()

  return (
    <View style={{ backgroundColor: theme.colors.primary.background }}>
      <Text style={{ color: theme.colors.primary.foreground }}>
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
const primaryBackground = theme.colors.primary.background
const appBackground = theme.colors.background
const appForeground = theme.colors.foreground

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

- Main color (e.g., `primary.main`) - The primary color for this role (string)
- Foreground color (e.g., `primary.foreground`) - Text/content on the main color (string)
- Background color (e.g., `primary.background`) - Surfaces/containers for this role (string)

#### Brand Colors

- `theme.colors.primary.main` - Main primary brand color
- `theme.colors.primary.foreground` - Text color on primary backgrounds
- `theme.colors.primary.background` - Primary surface/container color

- `theme.colors.secondary.main` - Main secondary brand color
- `theme.colors.secondary.foreground` - Text color on secondary backgrounds
- `theme.colors.secondary.background` - Secondary surface/container color

- `theme.colors.tertiary.main` - Main tertiary brand color
- `theme.colors.tertiary.foreground` - Text color on tertiary backgrounds
- `theme.colors.tertiary.background` - Tertiary surface/container color

#### Semantic Colors

- `theme.colors.danger.main` - Main danger/error color
- `theme.colors.danger.foreground` - Text color on danger backgrounds
- `theme.colors.danger.background` - Danger surface/container color

- `theme.colors.warning.main` - Main warning/caution color
- `theme.colors.warning.foreground` - Text color on warning backgrounds
- `theme.colors.warning.background` - Warning surface/container color

- `theme.colors.success.main` - Main success/positive color
- `theme.colors.success.foreground` - Text color on success backgrounds
- `theme.colors.success.background` - Success surface/container color

#### Utility Colors

- `theme.colors.default.main` - Default text/content color
- `theme.colors.default.foreground` - Text color on default backgrounds
- `theme.colors.default.background` - Default surface/container color

#### Background

- `theme.colors.background` - Main background color
- `theme.colors.foreground` - Text color on background

## useColorMode Hook

Access the current color scheme with a hook that works on both native and web:

```typescript
import { useColorMode } from '@xaui/core/theme'

const mode = useColorMode() // 'light' | 'dark'
```

## Color Tokens

Access the full Tailwind-inspired color palette:

```typescript
import { colors } from '@xaui/core/colors'

const blue500 = colors.blue[500]
const red600 = colors.red[600]
```

## TypeScript Support

All exports are fully typed for excellent IntelliSense support:

```typescript
import type { XUITheme } from '@xaui/core/theme'
```

## Theme Structure

The default theme includes:

- **Colors**: Material Design-inspired color system with a flat structure. Each role has three related properties:
  - Main color (e.g., `primary.main`) - The primary color for this role
  - Foreground color (e.g., `primary.foreground`) - Text color for content on the main color
  - Background color (e.g., `primary.background`) - Color for surfaces/containers using this role
- **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl (4px to 64px)
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full (0px to 9999px)
- **Border Width**: none, xs, sm, md, lg, xl (0px to 4px)
- **Font Sizes**: xs to 4xl (12px to 36px)
- **Font Weights**: light, normal, medium, semibold, bold, extrabold
- **Font Families**: body, heading, default (defaults to 'System' and 'monospace')
- **Shadows**: sm, md, lg, xl with React Native shadow properties

## License

MIT
