# `system/`

What you **build XAUI components with**. Ships as `@xaui/native/system` and follows
semver — the components in this package use it through exactly the same surface a third
party does.

## The boundary that matters

`system/` is public and stable. `utils/` is private and can change at any time. A helper
that becomes useful to someone writing their own component **moves** here; it is never
re-exported from `utils/`.

## What belongs

- A primitive a component author needs and cannot reasonably write themselves: the style
  engine, slot plumbing, touch feedback, the portal, the icon.
- Nothing component-specific. If only `Button` needs it, it lives in `components/button/`
  until a second component asks for it (§2 bis).
- The exported surface is deliberate: an internal that `createRecipe` happens to use is
  not exported just because it exists. `style-cache`, `variant-map` and `resolve-tint`
  are imported directly by their tests, not published.

## Current contents

| Folder    | Role                                                                |
| --------- | ------------------------------------------------------------------- |
| `recipe/` | The style engine: variants name tokens, styles resolve once, cached |

## `recipe/` in one page

A recipe declares a component's style once. `resolve` is the cached pass and `tint` the
uncached one:

```ts
const styles = buttonRecipe.resolve({ theme, selection: { variant, size }, states })
const tint = color ? buttonRecipe.tint({ theme, color, selection, states }) : undefined

<Pressable style={[styles.root, tint?.root, style]} />
```

**Resolution order, frozen:**

```
base → paint → variants → compoundVariants → states → slot props → slot style
```

The last two happen at the call site, and they always win.

**The cache** is one `Map` per recipe, keyed by
`${theme.id}|${theme.mode}|<axes, sorted>|<active states>`. `StyleSheet.create` runs once
per combination for the app's lifetime, so slots read a stable reference and a press
allocates nothing.

`theme.mode` is in the key because `createTheme` gives light and dark the same `id`.
`color` is **not** in the key: it takes arbitrary values (R7), so it would grow the table
with the colours users invent instead of with the finite combinations of tokens. That is
the whole reason it gets a second pass.

**A variant names tokens, `paint` places them.** `variantTokens` is data — ten lines of
token names. `paint` is written once per component and says which slot takes the
background and which takes the foreground. The tint pass reuses it, which is how `color`
lands where the variant put its tokens with nothing further to declare: a background for
`primary`, a label for `ghost`, a border for `tertiary`.
