---
'@xaui/native': patch
---

`Row` and `Column` — the two axes of a layout

Each contributes one declaration, `flexDirection`, and nothing else. `gap`, `alignItems`,
`justifyContent` and `padding` are `ViewStyle` keys that R14 already exposes as props on
every node, so these two add no vocabulary of their own — which is the change from the
legacy components, where `mainAxisAlignment`, `crossAxisAlignment`, `mainAxisSize`,
`direction` and `reversed` were words to learn for what React Native already says.

`flexDirection` is the one style prop they do not expose: it is their identity, and a `Row`
that could be told to lay out as a column would be a `View` with a longer name.

Three entries of the legacy `view/` lot are deliberately not ported, because R14 removed
their reason to exist: `Padding` is `padding={16}` on the node itself, `Center` is two
alignment props on the parent, and `Spacer` is `justifyContent="space-between"`. Each added
a view node to say what a style prop already says.
