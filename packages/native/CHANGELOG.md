# @xaui/native

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
