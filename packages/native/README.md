# @xaui/native

React Native components and hooks that extend the core `@xaui/core` theme system. This mobile layer ships animated primitives (buttons, indicators, hooks) ready to use with `XUIProvider`.

## Installation

```bash
pnpm add @xaui/native
```

### Peer dependencies

- `react` ^18 || ^19
- `react-native` >=0.70.0
- `react-native-reanimated` >=4.0.0
- `react-native-svg` >=13.0.0

The package also relies on `@xaui/core/theme` for the shared tokens.

## Quick start

1. Wrap your tree with `XUIProvider` to expose the tokens and follow the system color scheme:

```tsx
import { XUIProvider } from '@xaui/native/core'
import { theme, darkTheme } from '@xaui/core/theme'

export default function App() {
  return (
    <XUIProvider theme={theme} darkTheme={darkTheme}>
      {/* your screens */}
    </XUIProvider>
  )
}
```

2. Consume the theme inside your components via `useXUITheme` or `useColorMode`:

```tsx
import { Text, View } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native/core'

function Banner() {
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View style={{ backgroundColor: theme.colors.primary.background }}>
      <Text style={{ color: theme.colors.primary.foreground }}>
        Current mode: {mode}
      </Text>
    </View>
  )
}
```

## Key components

### `Button`

- Variants: `solid`, `outlined`, `flat`, `light`, `faded`
- Sizes: `xs`, `sm`, `md`, `lg`
- Radii: `none`, `sm`, `md`, `lg`, `full`
- Supports start/end content, `fullWidth`, `isDisabled`, `isLoading` with an integrated spinner
- Declarative press animations (scale, opacity, spring)

```tsx
<Button
  themeColor="primary"
  variant="solid"
  elevation={2}
  size="lg"
  radius="full"
  isLoading={saving}
  spinnerPlacement="end"
  onPress={handleSave}
>
  Save changes
</Button>
```

`useButtonStyles` exposes the internal calculations if you need to derive custom layouts (spacing, colors, shadows, spinner size).

### `ActivityIndicator`

- Variants: `circular` (default size 40) and `linear` (custom height)
- Draws from the theme colors (`primary`, `secondary`, etc.) and optionally renders a track with `showTrack`
- `disableAnimation` is provided for snapshots or silent loading states

```tsx
<ActivityIndicator
  variant="linear"
  themeColor="secondary"
  showTrack
  borderRadius={4}
/>
```

## Theme hooks & utilities

- `useXUITheme()` must be used within `XUIProvider`; it throws if the provider is missing.
- `useXUIColors()` is a shortcut for reading just the color tokens.
- `useColorMode()` returns `light` or `dark` based on React Native's `useColorScheme()`.
- `XUIProvider` accepts `theme` and `darkTheme` as `DeepPartial<XUITheme>` so you can override partial token sets without redefining the entire theme.

## Testing & build

- Bundles are produced with `tsup` (ESM + CJS outputs under `dist`).
- Tests live under `packages/native/__tests__` and run with `vitest`.

## License

MIT
