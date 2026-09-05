---
'@xaui/native': patch
---

feat(input-group): `InputGroup` — a field with something beside it

A glyph, a unit, a reveal toggle. `InputGroup` goes **inside** an `Input` and replaces
nothing but the field: the column, the label, the hint, the error, the four variants, the
`size`, the `radius`, the tint, the focus, `isInvalid` and `isDisabled` all stay the
`Input`'s, and this root owns exactly one thing — how wide its two decorators turned out to
be.

**The box is still the `TextInput`.** `InputGroup.Prefix` and `InputGroup.Suffix` are taken
out of flow and laid over the field, so no wrapper borrows the border, the fill, the radius
and the shadow: there is one box in the library and this is not a second one to keep in step.
The field clears them by their **measured** width instead — `paddingStart` and `paddingEnd`,
logical edges (R13) — which is the same shape `TextArea` uses for `rows`: a raw value the
slot turns into a style, outside the cache (R6). A width takes as many values as there are
decorators and could never be a cache key.

`isDecorative` does the two things that belong together: touches pass through to the field
underneath, and the content leaves the accessibility tree. It is off by default, because a
suffix is most often a control and one that swallowed its own taps would be a reveal toggle
you cannot press. A disabled `Input` takes the touches from both decorators all the same.

`InputGroup.Icon` is the slot `Button`, `Chip` and `Alert` already have, and the one HeroUI's
component does not: a glyph one step above the field's type, in the theme's
`fieldPlaceholder`, so a form does not carry a hard-coded `#888` on every field.

The `Input`'s recipe gains three slots — `prefix`, `suffix` and `icon` — because the size
that decides the decorator's inset and the glyph's scale is the field's, and a group with an
axis of its own would be a second answer to a question the `Input` has already answered.

Not one of the fifteen the 1.0 core is scoped to; recorded as P5.3.
