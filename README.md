# XAUI Library

> [!WARNING]
> **🚧 VERSION ALPHA - EN DÉVELOPPEMENT ACTIF 🚧**
>
> Cette bibliothèque est actuellement en version alpha et n'est pas encore prête pour la production. L'API peut changer de manière significative entre les versions.

A modern and performant React Native UI library, heavily inspired by Flutter, with smooth animations and a Turborepo architecture.

## 📦 Installation

### For Expo Projects

Install the core package:

```bash
npx expo install @xaui/core
```

If you want to use the color utilities separately:

```bash
npx expo install @xaui/colors
```

### For React Native CLI Projects

```bash
npm install @xaui/core
# or
yarn add @xaui/core
# or
pnpm add @xaui/core
```

## 🎨 Quick Start

### Setup XUIProvider

Wrap your app with `XUIProvider` to enable theming:

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

Provide a custom theme with partial overrides:

```typescript
import { XUIProvider } from '@xaui/core'

const customTheme = {
  colors: {
    primary: '#FF6B6B',
    onPrimary: '#FFFFFF',
    primarySurface: '#FFE5E5',
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

### Light/Dark Mode

Enable automatic theme switching based on system preferences:

```typescript
import { XUIProvider, theme, darkTheme } from '@xaui/core'

export default function App() {
  return (
    <XUIProvider theme={theme} darkTheme={darkTheme}>
      {/* Automatically switches between light and dark themes */}
    </XUIProvider>
  )
}
```

## 🚀 Features

- **Turborepo Architecture**: Optimized monorepo for rapid development
- **Flutter-like API**: Intuitive style props inspired by Flutter
- **Complete Design System**: Tailwind-inspired color palette (20+ colors × 11 shades)
- **Powerful Theme System**: Dynamic theming with light/dark mode support
- **Next.js Documentation**: Interactive documentation with live examples
- **TypeScript First**: Fully typed for better DX
- **Integrated Tests**: Vitest configuration with comprehensive coverage
- **CI/CD Ready**: GitHub Actions configured with Changesets for versioning

## 📦 Components

### Available Components

#### Theme & Core
- 🎨 [**XUIProvider**](./packages/core/core) - Theme provider with light/dark mode support
- 🌈 [**Colors**](./packages/core/colors) - Tailwind-inspired color palette (20+ colors × 11 shades)

#### Buttons
- 🔘 [**Button**](./packages/components/buttons#button) - Versatile button component with 6 variants, loading states, and ripple effects
- 🎯 [**IconButton**](./packages/components/buttons#iconbutton) - Icon-only button optimized for actions with transparent default

#### Progress Indicators
- 🔄 [**CircularActivityIndicator**](./packages/components/progress) - Animated activity indicators with 3 variants (spinner, ticks, bullets)

#### Form Controls
- ☑️ [**Checkbox**](./packages/components/checkboxes) - Customizable checkbox component with filled and light variants
- 🔘 [**Switch**](./packages/components/switches) - Toggle switch component with inside and overlap variants

### Coming Soon

- ☐ **Radio** - Radio button component
- ☐ **Input** - Text input with validation
- ☐ **Card** - Container component with variants
- ☐ **Modal** - Dialog and modal system
- ☐ **Toast** - Notification system
- ☐ **Dropdown** - Dropdown menu component
