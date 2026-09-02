---
'@xaui/native': patch
---

Add the style engine, on the new `@xaui/native/system` subpath.

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
