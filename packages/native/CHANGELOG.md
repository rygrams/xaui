# @xaui/native

## 0.9.1-alpha.11

### Patch Changes

- 76441cd: Ship workletized code, or every animation is a hard crash.

  The Reanimated Babel plugin turns a function into a worklet — a serialized body plus its
  captured closure — and Reanimated **aborts the process** when it is handed a plain function
  to run on the UI runtime: `Abort trap: 6` inside `WorkletRuntime::runSync`, with no
  JavaScript error to read. In an app that transformation happens in the consumer's Metro
  build; over a published `node_modules` it does not. The libraries that get this right ship
  their _source_, so Babel sees the original call sites; we ship a compiled `dist`, so the
  same pass now runs in our own build (`tooling/workletize/`).

  Every animated hook also carries an explicit `'worklet'` directive. It is the load-bearing
  half: the CJS output calls the hook as `_reactNativeReanimated.useAnimatedStyle(...)`, and
  the plugin recognises the bare identifier rather than the namespace member — so without the
  directive the pass finds nothing to transform. The explicit dependency arrays stay for the
  web, where the hook throws instead of aborting.

## 0.9.1-alpha.10

### Patch Changes

- c4c4657: Fix what the blocking P2 API review found, before fifteen components copy it.

  **`require()` failed on every subpath.** `exports.require` pointed at the ESM build while
  the CJS build was produced and never referenced, so in a `"type": "module"` package every
  `require('@xaui/native')` threw a `SyntaxError`. Both packages now declare the full dual
  form, with types **per condition** — `.d.ts` under `import`, `.d.cts` under `require` — so
  a CommonJS consumer no longer type-checks against the ESM declarations.

  **Overlays painted outside rounded corners.** `Highlight` and `Ripple` are absolute fills
  with square corners, and every control in the library is rounded. The clip existed only for
  `scale-ripple`, and only on the animated branch; it now applies on both branches whenever a
  default overlay is mounted — and only then, so a root without one can still let a child
  overflow.

  **`accessibilityState` was replaced instead of merged** on `Button`. A caller adding
  `expanded` or `selected` silently erased `disabled` and `busy`, and a screen reader stopped
  announcing a disabled button.

  **`defaultVariants` narrowed a recipe's whole `Variant` type** to the single value named in
  it, making every other variant a type error at the call site. `NoInfer` in the engine
  removes the cast each of the forty-seven components would otherwise have carried.

## 0.9.1-alpha.9

### Patch Changes

- 40b48e0: Add `Button` — the first v1 component, on `@xaui/native/button`.

  ```tsx
  <Button onPress={submit}>Envoyer</Button>

  <Button variant="danger" size="lg">
    <Button.Icon as={TrashIcon} />
    <Button.Label>Supprimer</Button.Label>
  </Button>
  ```

  Ten variants naming tokens and computing nothing, four sizes driving height and never
  width, `color` as one raw tint that lands where the variant put its tokens, `isLoading`
  inserting a spinner when none is composed, and `asChild` handing the press to someone
  else's element. The view depth is one — `PressableFeedback > (Text | Icon)` — and a press
  allocates no style: every combination of tokens is resolved once and cached for the
  lifetime of the app.

  Two fixes the component needed on the way:
  - The build emitted classic `React.createElement` against a binding the sources never
    import, so **every component in the published package would have thrown on first
    render**. esbuild now uses the automatic JSX runtime.
  - Every animated hook carries an explicit dependency array. Reanimated's Babel plugin
    infers one, but it runs in the consumer's build and does not reach a published `dist` on
    web, where the hook throws instead of animating.

  `usePressState` now accepts `null` handlers, which is how `PressableProps` types them.

## 0.9.1-alpha.8

### Patch Changes

- 6cc7b49: Fix `asChild` on `PressableFeedback`, which silently dropped every pressable prop.

  Under `asChild` the root renders a `Slot`, and a `Slot` merges its props into its single
  child. That child was the feedback context provider, so the ref, the style, the press
  handlers and `disabled` all landed on a provider that ignores them: the caller's element
  stopped reacting to touch entirely, with no error to say so. The provider now sits above
  the root, and the caller's element receives the props it was always meant to.

  The default overlay is no longer rendered under `asChild`. The caller's element _is_ the
  pressable there, so there is no sibling to inject it as; the context is still published, so
  `<PressableFeedback.Highlight />` among the caller's own children still works.

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
