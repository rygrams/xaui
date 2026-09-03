---
name: xaui-system
description: Build or change the shared primitives under packages/native/src/system — the recipe/style-cache engine, slot context and childrenToString, asChild merge helpers, PressableFeedback, Portal, and the Icon primitive. Use when a task touches the style resolution engine, style caching, slot plumbing, touch feedback, or the public @xaui/native/system surface.
---

# XAUI v1 — The system layer

`system/` is what third parties use to build **their own** XAUI components. It ships as
`@xaui/native/system` and follows semver. `utils/` is private and may change at any time —
if a helper becomes useful outside, it **moves** to `system/`, it is not re-exported from
`utils/`.

Source of truth: `.project-specs/XAUI-V1-PLAN.md` §3 (style engine), §1 ter (what to take
from HeroUI), §2 (folder layout), §9/P1 (acceptance criteria).

## `system/recipe/` — the style engine

```ts
export const buttonRecipe = createRecipe({
  slots: ['root', 'label', 'icon', 'spinner'],
  base: (t) => ({
    root:  { flexDirection: 'row', alignItems: 'center', gap: t.spacing(2), overflow: 'hidden' },
    label: { fontWeight: '500', textAlign: 'center' },
  }),
  variantTokens: {                       // a variant NAMES tokens, it paints nothing
    primary:        { bg: 'accent',      fg: 'accentForeground' },
    'danger-soft':  { bg: 'dangerSoft',  fg: 'danger' },
    // …the ten values of Variant
  },
  variants: {
    size: { md: (t) => ({ root: { height: t.controlHeights.md }, label: { fontSize: t.fontSizes.md } }) },
  },
  states: {
    disabled: () => ({ root: { opacity: 0.5 }, label: { opacity: 0.7 } }),
    pressed:  () => ({ root: { opacity: 0.9 } }),
  },
  defaultVariants: { variant: 'primary', size: 'md', radius: 'md' },
})
```

**Resolution order — frozen, do not reorder:**

```
base → variants → compoundVariants → states (pressed/disabled/focused)
     → slot props → slot style          ← always wins
```

**The cache** (`style-cache.ts`): a module-level
`Map<string, Record<Slot, RegisteredStyle>>` keyed by

```
`${themeId}|${variant}|${size}|${radius}|${states}`
```

`StyleSheet.create` runs **once per combination encountered in the app's lifetime**, and
slots then receive stable references — which is what makes `React.memo` actually work and
what keeps a press from allocating anything.

This only holds if every key component is a finite token (R6). Letting `padding={13}` into
the key blows up the table — that is the whole reason arbitrary values go through `style`.

**`color` never enters the key.** Two passes:

1. the **cached** pass, from tokens (`variant`, `size`, `radius`, states) → stable
   `StyleSheet` references;
2. the **tint** pass, only when `color` is given: `deriveTint(color)` (same OKLab formulas
   as the theme's derived layer — see the `xaui-theme` skill), applied to the slots the
   variant designates.

```tsx
style={[cached.root, tint?.root, style]}
```

`deriveTint` is itself memoized per tint value — sRGB→OKLab→sRGB is not free per render.

Acceptance: two resolutions of the same tokens return the **same object reference**; a
different `color` adds **no entry** to the cache.

## `system/slot/`

- `create-slot-context.ts` — strict context with a named error when a slot hook is used
  outside its parent (`Error.captureStackTrace`, like HeroUI).
- `children-to-string.ts` — recursive stringification (R3). **Do not inspect the first
  child**: try to stringify the whole tree; if it contains any React element, return
  `null` and pass children through; otherwise wrap the concatenated string in the default
  text slot. This is what makes `<Button>{count} items</Button>` (an array
  `[3, ' items']`) work where `isValidElement` would fail.
  Acceptance: `childrenToString([3,' items']) === '3 items'`; with an element inside,
  `null`.
- `merge-props.ts` / `merge-refs.ts` — the `asChild` support (R12), applied uniformly from
  the first component. Retrofitting it later changes the ref signature of the whole core.

## `system/pressable-feedback/`

Touch feedback is **one shared primitive**, not a `.animation.ts` per component — it is the
same everywhere and has no reason to be rewritten 47 times.

- slots `.Highlight` and `.Ripple`
- `feedbackVariant`: `'scale-highlight' | 'scale-ripple' | 'scale' | 'none'`
- `animation`: `false | 'disabled' | 'disable-all' | { …per sub-animation }`

Every pressable component depends on it (`Button`, `Chip`, clickable `Card`, `ListItem`,
`MenuItem`, `SegmentButton`…). Acceptance: the four `feedbackVariant` values render, and
`animation={false}` mounts no worklet.

100% Reanimated (+ `react-native-worklets`) — RN's legacy `Animated` exists only in the
frozen legacy tree.

## `system/portal/`

Moved as-is from the old `core/portal/`. Backs `Dialog`, `Sheet`, `Drawer`, `Snackbar`.
Acceptance: the existing tests pass unmodified.

## `system/icon/`

The gap HeroUI never closed: an icon is a third-party component, slot context doesn't reach
it, so their users compute the colour by hand. XAUI's `Icon` reads the parent slot context
for **size and colour**.

Three accepted forms: `as={Component}` (injects `size`/`color` — covers Lucide, Ionicons,
vector-icons), raw SVG `children` (props cloned, `react-native-svg`), or `source` image.

```tsx
<Button variant="danger">
  <Button.Icon as={TrashIcon} />       {/* colour and size inherited — nothing to compute */}
  <Button.Label>Supprimer</Button.Label>
</Button>
```

Acceptance: a Lucide icon and a raw SVG both take the parent variant's colour with no
explicit prop.

## `hooks/`

`use-controllable-state` (both modes, plus the dev warning when switching between them),
`use-press-state` (no needless re-render), `use-merged-ref`, `use-previous`.

## Dependency discipline

`react-native-reanimated` and `react-native-worklets` are **required** peers.
`react-native-gesture-handler`, `react-native-svg`, `react-native-safe-area-context` are
**optional** (`peerDependenciesMeta`) and imported **only** by the components that use
them — importing one from the root barrel defeats the point. Each such component throws an
explicit dev error when its package is missing, instead of `undefined is not a function`.

Zero runtime dependencies in the package.

## Before finishing

- [ ] Public API of `system/` is intentional — everything exported is something a third
      party genuinely needs.
- [ ] Mirror tests in `src/__tests__/system/…` for the **pure** modules — recipe
      resolution, style cache, `childrenToString`, `mergeProps` / `mergeRefs`. The
      component-shaped primitives (`PressableFeedback`, `Icon`, `Portal`) get none.
- [ ] Reference-stability test for anything touching the cache.
- [ ] `pnpm lint && pnpm type-check && pnpm test`.

## `style-props/` — R14, specified, not built (P2.6)

Spacing and placement are props rather than an object, and the resolver is shared:

```tsx
<Button padding={16} width="100%">Envoyer</Button>
<Button.Label fontSize={18}>Envoyer</Button.Label>
```

The set is the node's style type — `ViewStyle`, `TextStyle` on a text slot — **minus the
directional keys R13 bans**, which are not exposed at all:

```ts
type StyleProps = Omit<ViewStyle, DirectionalStyleKey>
```

Full RN names and **full RN values**: `padding={16}` is 16 points, exactly as `style` would
be. No abbreviations, and above all no hidden scale — a prop carrying the RN key's name and
multiplying its value would be the most expensive trap in the API, the kind you only catch
by measuring on screen. The scale stays explicit: `padding={t.spacing(4)}`.

A style prop styles **its own node**, never a descendant (R1), which is what separates it
from `customAppearance`.

Two pieces, and the split is the point:

```ts
splitStyleProps(props) // utils/ — pure, mirrored test; splits, transforms nothing
useStyleProps(props) // system/style-props/ — the same, memoized on the values
```

It resolves **outside the style cache**, in the same second pass as the tint, and lands
after it and before the slot's `style`. Putting a style prop in the cache key is the one
way to get this wrong: the table would then grow with caller values instead of with the
finite combinations of tokens.

Plan §2 ter has the full table and the reasoning.
