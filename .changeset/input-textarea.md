---
'@xaui/native': patch
---

feat(text-area): `TextArea` — a multiline field, over the `Input`

Not "like" an `Input` — it **is** one. `TextArea` renders the `Input`'s root: the same
recipe, the same resolved context, the same four variants, the same `size`, `radius`,
`color`, `labelPlacement`, `isInvalid` and `isDisabled`. `TextArea.Label`, `.Description`
and `.Error` are literally the `Input`'s slots, re-exported rather than wrapped.

Only `TextArea.Field` differs, by three things: `multiline`, the text pinned to the top, and
a height counted in lines. That is HeroUI's answer too — their `TextArea` is twenty lines
rendering their `Input` with the same three defaults.

`rows` (default `3`) and `maxRows` are **raw values** (R6), like `color`: they resolve
outside the style cache from the line height the size chose, so `rows={7}` costs no cache
entry. Past `maxRows` the field stops growing and scrolls; unset, it grows with the text and
has nothing to scroll, which is why `scrollEnabled` follows `maxRows` rather than being a
prop of its own.

The `Input`'s recipe gains a `textArea` slot carrying only the delta — the line height, the
vertical padding and `textAlignVertical` — layered over the field's own style, so the
colours, the border and the radius are resolved once for both. The four inside-label
compounds write to it as well, so `labelPlacement="inside"` composes.

Not one of the fifteen the 1.0 core is scoped to; recorded as P5.
