# @xaui/native

## 0.9.1-alpha.7

### Patch Changes

- 824d5b6: Declare `semver` where it is used. `tooling/pack-check` checks, against the **packed**
  manifests, that `@xaui/native` can only ever appear once in a consumer's resolution tree:
  it is a peer and never a dependency, neither package carries a runtime dependency, no
  `workspace:` protocol survives packing, and every peer range admits the version actually
  shipped.

## 0.9.1-alpha.6

### Patch Changes

- d8783d7: Add the shared hooks: `useControllableState`, `usePressState`, `useMergedRef` and
  `usePrevious`.

  `useControllableState` gives a component one state that works whether the caller drives it
  or not, so there are never two code paths for the same value. Its setter keeps its identity
  across renders and reads the current value from a ref, which is what lets a handler built
  on it be passed to a memoized child. Switching between the two modes mid-life warns in
  development — it is always a bug, and invisible without it.

  `usePressState` is the press state a root owns, with handlers that **compose** the caller's
  rather than replacing them and keep their identity across renders. Every pressable
  component needs those three properties and gets one of them wrong on its own.

  `useMergedRef` memoizes `mergeRefs` on the refs it was given, so React does not detach and
  reattach every one of them — and pay for a node measurement — on each render.

## 0.9.1-alpha.5

### Patch Changes

- 60011be: Add `Icon` to `@xaui/native/system`.

  An icon is a third-party component, so a slot context never reaches it and every call site
  ends up computing the colour by hand. `Icon` closes that: three forms — a component through
  `as` (`size` and `color` injected, covering Lucide, Ionicons and vector-icons), a raw
  `react-native-svg` element as children, or an image through `source` — all resolving the
  same way. An explicit prop, else what the surrounding slot published through `IconContext`,
  else the theme.

  For a raw SVG the resolved values win over the element's own `width`, `height` and `color`:
  one arriving from a design tool carries a baked-in size, and inheriting the slot's instead
  is the point of wrapping it. `react-native-svg` stays an optional peer — nothing here
  imports it, the raw-SVG form only clones an element the caller already made.

## 0.9.1-alpha.4

### Patch Changes

- 06d5069: Add `Portal` and `PortalHost` to `@xaui/native/system`.

  `Portal` renders its children into the nearest `PortalHost` instead of where it sits, which
  is what `Dialog`, `Sheet`, `Drawer` and `Snackbar` will be built on — an overlay has to
  escape the clipping and stacking of whatever container held the trigger. Publishing happens
  in a layout effect, so the content lands in the same commit as the trigger's and an overlay
  never shows a frame late.

  Outside a host the context is `null` and `Portal` renders nothing rather than throwing: an
  app that forgot `PortalHost` should lose its overlays, not crash on its first dialog.

## 0.9.1-alpha.3

### Patch Changes

- c4d26ad: Add `PressableFeedback` to `@xaui/native/system`: the touch feedback every pressable
  component shares, instead of an animation file per component.

  It renders the pressable root and is **controlled** — the component above owns `isPressed`,
  because its recipe resolves on that value and needs it before rendering.
  `feedbackVariant` picks what happens under the finger (`scale-highlight`, `scale-ripple`,
  `scale`, `none`) and mounts the matching overlay; `PressableFeedback.Highlight` and
  `.Ripple` are slots a root can render itself when it wants to style one.

  `asChild` goes **through** this component rather than around it: a root swapping it for a
  bare `Slot` would render the child with no touch feedback at all. `isDisabled` replaces
  React Native's `disabled` (R8), and each overlay takes its own `animation` — `false`, or a
  `duration` and `opacity` — over the blanket one on the root.

  `animation` on the root accepts `false`, `'disabled'`, `'disable-all'` or an object
  switching sub-animations off one at a time. Turning animations off renders a different component
  rather than the same one with a branch inside, so no Reanimated hook is reached and no
  worklet is mounted. `'disable-all'` reaches descendants through context, so a long list
  disables every row's worklets with one prop.

  Also types `XAUITheme['fontWeights']` as React Native's own `fontWeight` instead of
  `string`, which does not assign to it — every component reading `t.fontWeights.medium`
  would otherwise have needed a cast.

## 0.9.1-alpha.2

### Patch Changes

- c0a6e44: Add the slot primitives to `@xaui/native/system`: `createSlotContext`,
  `childrenToString`, `Slot`, `mergeProps` and `mergeRefs`.

  `createSlotContext(name)` returns a `[Provider, useSlot]` pair, so each compound names the
  hook it exports and a slot read outside its root throws an error naming both the hook and
  the component instead of failing three frames later on `undefined`.

  `childrenToString` implements the text auto-wrap once for the whole library. It stringifies
  the tree recursively rather than inspecting the first child, which is what makes
  `<Button>{count} items</Button>` — children `[3, ' items']` — resolve to `'3 items'`.

  `Slot` is the `asChild` render branch: `const Root = asChild ? Slot : Pressable`. It merges
  through `mergeProps`, which composes event handlers rather than replacing them, stacks
  styles with the child's on top, keeps a `Pressable` state-function style callable, and
  merges refs. `asChild` has to be uniform from the first component — retrofitting it changes
  the ref signature of every core component at once.

## 0.9.1-alpha.1

### Patch Changes

- 09cda9d: Add the style engine, on the new `@xaui/native/system` subpath.

  `createRecipe` declares a component's style once and resolves it in two passes. The cached
  pass is keyed by finite tokens alone — theme, mode, variant, the axes, the active states —
  so `StyleSheet.create` runs once per combination for the app's lifetime and every slot
  reads a stable reference, which is what lets `React.memo` work and keeps a press from
  allocating. The `color` prop takes arbitrary values, so it stays out of the key and gets a
  second, uncached pass: the cache grows with the number of token combinations, not with the
  palette an app invents.

  A variant names tokens and a single `paint` function says where they land, so the tint pass
  reuses it and `color` lands wherever the variant put its tokens — a background for
  `primary`, a label for `ghost`, a border for `tertiary` — with nothing further to declare.
  `theme/derive-tint.ts` expands one raw tint into the six slices a variant consumes, using
  the same OKLab formulas as the derived colour layer, memoized per tint and mode.

## 0.9.1-alpha.0

### Patch Changes

- 88c692a: Publish to npm again, under the `alpha` dist-tag.

  Both packages were `private` while the v1 rewrite started from an empty `src/`. They are
  publishable again, but the repo is now in changesets **pre mode** with the tag `alpha`, so
  `changeset publish` ships them as `alpha` and leaves `latest` where it is —
  `@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14`, the last releases that actually carry
  components. Installing either package without a tag keeps returning those.

  `pnpm add @xaui/native@alpha` is the opt-in. At this point it exports the theme layer only
  (`createTheme`, `XAUIProvider`, the token and colour utilities) — the components land from
  P2 on, one at a time, which is exactly what the tag announces.

## 0.9.0

### Patch Changes

- 1f09f09: Add an ESLint rule (R13) that forbids directional style properties (`left`, `right`, `paddingLeft`, `marginRight`, `borderLeftWidth`…) in `packages/native/src` — use the Start/End equivalents instead so React Native mirrors layout correctly under RTL.
