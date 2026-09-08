# `theme/`

The design values and how components read them.

## What lives here

| File               | Role                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| `tokens.gen.ts`    | **Generated.** Both colour layers, already resolved, for light and dark |
| `theme.type.ts`    | `XAUISourceColors`, `XAUIDerivedColors`, `XAUITheme`, `XAUIThemeConfig` |
| `palette.ts`       | The raw Tailwind scale, 22 families x 11 shades — **outside** the theme |
| `derive-colors.ts` | The 32 formulas that turn the source layer into the derived one         |
| `scales.ts`        | Radius, spacing unit, control heights, type scale, semantic shadows     |
| `create-theme.ts`  | The public configuration API, and the theme `id`                        |
| `theme-context.ts` | The bare React context                                                  |
| `theme-hooks.ts`   | `useXAUITheme`, `useThemeColor`, `useColorMode`, `useAppearance`        |
| `appearance.ts`    | The theme read as app chrome — status bar, navigation bar, a header     |

`XAUIProvider` lives in `provider/` but is exported from here — one import path for
everything theme-related.

## The two layers

A source layer of ~32 colours per mode is written by hand in `tooling/tokens/source.ts`.
Everything else is **derived** — override `accent`, and `accentPressed`, `accentSoft` and
`accentSoftForeground` follow. Never add a derivable token to the source layer.

## The chrome above the provider

`XAUIProvider` dresses everything the library renders and **nothing above it**. A status bar
belongs to the platform and a navigation header belongs to whichever navigator the app chose,
so the theme carries neither `expo-status-bar` nor React Navigation — it answers what they
ask instead, and the app wires four values:

```tsx
function Shell({ children }) {
  const { colorMode, barContent, statusBarStyle, background, foreground } =
    useAppearance()

  return (
    <>
      {/* React Native's own — no extra dependency. */}
      <StatusBar barStyle={statusBarStyle} backgroundColor={background} />

      {/* expo-status-bar, which takes the one-word form. */}
      <ExpoStatusBar style={barContent} />

      {/* Expo Router, or React Navigation. */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: background },
          headerTintColor: foreground,
          contentStyle: { backgroundColor: background },
        }}
      >
        {children}
      </Stack>
    </>
  )
}
```

It has to be **under** the provider: `useAppearance` reads the resolved theme, and the
provider is what resolves it. `appearanceFor(theme)` is the same mapping as a plain function,
for a navigator built outside it.

**`barContent` is the opposite of `colorMode`** — a dark app draws light text up there. That
inversion is the one thing this module exists for: `barContent === colorMode` reads correctly
in prose, is backwards on screen, and is invisible on a simulator whose bar happens to be
white, so it ships as a status bar nobody can read.

## The palette is not the theme

`palette` is raw material, exported so an app can build its own source layer from the same
scale. Components read semantic tokens — `accent`, `danger`, `surface` — **never**
`palette.zinc[500]`. A component reaching into the palette has bypassed theming: it will not
follow a brand override and will not switch with the colour mode.

```ts
import { createTheme, palette } from '@xaui/native/theme'

export const appTheme = createTheme({
  colors: {
    light: { accent: palette.blue[600] },
    dark: { accent: palette.blue[400] },
  },
})
```

## Using it

```ts
// app/theme.ts — module level, so the object is stable by construction
export const appTheme = createTheme({
  colors: { light: { accent: '#3b82f6' }, dark: { accent: '#60a5fa' } },
  radius: 8,
})
```

```ts
const theme = useXAUITheme()
const accent = useThemeColor('accent')
const [bg, fg] = useThemeColor(['background', 'foreground'])
```

## Rules

- **Never edit `tokens.gen.ts`.** Change `tooling/tokens/source.ts`, run
  `pnpm tokens:generate`. CI fails on a stale or hand-edited file.
- Colour maths runs at startup **only** when a consumer overrides the source layer.
- The merge order is default → user source → `deriveColors` → explicit derived overrides.
  Overrides land last, which is what makes mixing the two safe.
- A one-off colour on one component is not a theme override — that is the `color` prop or
  `style`.

See the `xaui-theme` skill for the formulas and the generation guards.
