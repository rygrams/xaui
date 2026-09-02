---
name: xaui-theme
description: Work on the XAUI theme layer — design tokens, the OKLab colour engine, deriveColors, createTheme, XAUIProvider, and the token generation pipeline. Use when adding or changing a token, touching tooling/tokens, debugging colour derivation or contrast CI, or changing how the theme is configured or read.
---

# XAUI v1 — Theme, tokens and colour

Source of truth: `.project-specs/XAUI-V1-PLAN.md` §4, plus the runnable reference in
`.project-specs/` — `source.mjs` (the source layer), `derive.mjs` (the ~30 derived
tokens), `oklab.mjs` (the colour maths), `tokens.json` (the expected output).
When implementing `utils/colors.ts`, `theme/derive-colors.ts` or `tooling/tokens/`,
port those files — do not re-invent the formulas.

## Two layers, one of which is never written by hand

| Layer | Where | Volume | Who writes it |
|---|---|---|---|
| **source** | `tooling/tokens/source.ts` | ~40 per mode | a human |
| **derived** | `theme/derive-colors.ts` | ~30 | `deriveColors()` |

That is the whole DX argument: you override `accent`, and `accentPressed`, `accentSoft`,
`accentSoftForeground` follow for free. Never add a derived token to the source layer to
"make it easier" — you'd be re-introducing the twelve-values-by-hand problem.

The source layer covers: base (`background`, `foreground`), surfaces (non-floating:
`surface*`), overlay (floating: `overlay`, `backdrop`), `muted`, `default` / `accent`,
fields (`field*`), intents (`success` / `warning` / `danger` + their `*Foreground`),
`segment`, and `border` / `separator` / `focus` / `link`. Plus the constant primitives
`white` / `black` / `snow` / `eclipse`.

The derived layer, verbatim from `derive.mjs`: pressed states (`mix(x, xForeground, 0.10)`,
`0.04` for `default`, `0.08` for `surface`), soft variants (`alpha(x, 0.15)` +
`mix(x, foreground, 0.20…0.35)`), background levels, border/separator levels, field states.

## Two native constraints

- **`mix` operates in OKLab, not sRGB** — sRGB mixes turn grey. `utils/colors.ts` holds
  `mix`, `alpha`, `contrastOn`, `contrastRatio` with frozen-value regression tests, e.g.
  `mix('#dc2626','#18181b',.20) === '#b22b28'`.
- **No `oklch()` in final values.** RN can't parse it. Generation converts to hex;
  `tokens.gen.ts` contains hex only.

## The rest of the theme

```ts
type XAUITheme = {
  mode: 'light' | 'dark'
  colors: XAUIColors                // source + derived, flattened
  spacing: (n: number) => number    // base 4 — spacing(3) === 12
  radius: XAUIRadius                // derived from a single base
  borderWidth: { default: number; field: number }
  fontSizes / lineHeights / fontWeights / fontFamilies
  shadows: { surface: ViewStyle; overlay: ViewStyle; field: ViewStyle }
  opacity: { disabled: number }
  controlHeights: Record<Size, number>
}
```

- **Radius derives from one base**: `xs: r*.25, sm: r*.5, md: r*.75, lg: r, xl: r*1.5,
  2xl: r*2, 3xl: r*3, 4xl: r*4, field: r*1.75, full: 9999`. One value redraws the library.
- **Shadows are semantic roles, not a scale** — `surface`, `overlay`, `field`. Dark mode
  drops the surface shadow and replaces the overlay one with a light inner hairline; an
  `sm→xl` scale cannot express that.
- **`spacing` is a function, not a table.** Base 4px.

## Configuration API

`createTheme` at **module level** — this is not a style preference, it is what makes the
memoization bug impossible:

```ts
// app/theme.ts
export const appTheme = createTheme({
  colors: { light: { accent: '#3b82f6' }, dark: { accent: '#60a5fa' } },
  radius: 8,
  fontFamilies: { body: 'Inter', heading: 'Inter-SemiBold' },
  controlHeights: { md: 48 },
})
```

Merge order, and it matters: **default → user source → `deriveColors` → explicit overrides
of derived tokens**. Overrides land *after* derivation, which is what makes mixing the two
safe.

`createTheme` computes the `themeId` once, at import. `themeId` is the first component of
the style cache key (`xaui-system` skill), so it must be a content hash — same input, same
id; a changed `accent`, a different id.

`colorMode` is **controlled** on the provider (`'system'` by default); the library owns
neither the state nor its persistence. `useColorMode()` returns the resolved mode, never
`'system'`.

Reading the theme: `useXAUITheme()`, `useThemeColor('accent')`, and the array overload
`useThemeColor(['background', 'foreground'])`.

**A one-off colour on one component is not a theme override** — it's the `color` prop or
`style`.

## The provider bug this replaces

```tsx
// current — the memo is invalidated on every parent render
const appTheme = React.useMemo(() => ({ ...defaultTheme, ...theme }), [colorScheme, theme])
```

A literal `theme={{ … }}` object changes identity on every parent render and rebuilds every
style in the app. The v1 provider depends on the stable `themeId`, not on prop identity.
Acceptance: a parent that re-renders 100 times recomputes the theme zero times.

## Generation and CI guards

```
tooling/tokens/source.ts → packages/native/src/theme/tokens.gen.ts   (numbers, hex)
                         → packages/hybrid/src/theme/tokens.gen.ts   (em, via toEm)
```

`generate.ts` writes **both layers already resolved** for the default light and dark
themes — no colour maths at app startup. `deriveColors` only runs at runtime when the user
overrides the source layer. It also applies hybrid's `em` convention and splits RN
shorthands (`paddingVertical` → `paddingTop`/`paddingBottom`) on the web side.

Three guards, all blocking:

1. `pnpm tokens:check` regenerates and diffs — any diff fails the build.
2. `light` and `dark` must have **identical keys** — a one-sided token is a build error,
   not an `undefined` in production.
3. Every `X` / `XForeground` pair must clear the contrast floor in both modes (24 pairs
   above 4.5). Lowering `accent` to `purple-500` must fail the build.

Files ending in `.gen.ts` are **never edited by hand** — change `source.ts` and regenerate.

## Checklist for a theme change

- [ ] Is it derivable? Then it goes in `derive-colors.ts`, not in the source layer.
- [ ] Added to both `light` and `dark`.
- [ ] `pnpm tokens:check` produces no diff.
- [ ] Contrast job still green for every `X`/`XForeground` pair.
- [ ] Frozen-value tests updated intentionally, never "to make the suite pass".
- [ ] Hybrid's `tokens.gen.ts` regenerated in the same commit (`em` units).
