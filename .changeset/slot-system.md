---
'@xaui/native': patch
---

Add the slot primitives to `@xaui/native/system`: `createSlotContext`,
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
