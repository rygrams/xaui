---
'@xaui/native': patch
---

`asChild` reached `Slot` as an array, so every pressable threw

`PressableFeedback` rendered `{overlays}{content}` — two expression children, which React
hands to the root as an array. Under `asChild` that root is a `Slot`, which merges into a
single element and threw instead, whether or not an overlay was composed: with none,
`partitionOverlays` returns `overlays: null` and `[null, content]` is an array all the
same. `<Button asChild>` was unusable, and so was every other pressable.

The root's children are now computed once, as a single node, by `feedbackChildren`.
`asChild` skips the partition entirely: the caller's element *is* the pressable, so an
overlay written inside it belongs to it and hoisting would make it a sibling of the very
element it was composed into.
