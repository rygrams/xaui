---
'@xaui/native': patch
---

feat(fab): the one thing to do on a screen, floating over it

`Fab` shares the `Button`'s variant table token for token and not its recipe: a button is a
row of text with padding, and this is a fixed square that carries a shadow at rest. Round or
extended, three sizes measured from Material and the legacy, and a `placement` that pins it
to the bottom in start/centre/end without a left or a right anywhere (R13).

`containsElementOfType` moves from `button.utils.ts` to `utils/children.ts` — its second use
is what promotes it (§2 bis) — and gains tests, including the one that says it looks no
deeper than the direct children.
