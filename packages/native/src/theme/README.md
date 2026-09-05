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
| `theme-hooks.ts`   | `useXAUITheme`, `useThemeColor`, `useColorMode`                         |

`XAUIProvider` lives in `provider/` but is exported from here — one import path for
everything theme-related.

## The two layers

A source layer of ~32 colours per mode is written by hand in `tooling/tokens/source.ts`.
Everything else is **derived** — override `accent`, and `accentPressed`, `accentSoft` and
`accentSoftForeground` follow. Never add a derivable token to the source layer.

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
