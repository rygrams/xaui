---
'@xaui/native': patch
---

feat(divider): the v1 `Divider` — three levels, one `alignSelf` for both axes

The thirteenth entry of the core. **One node and no slots**: a rule is a filled box one
point thick, and there is nothing inside it. A divider with a word across it is a `Row`
holding two of these and a `Typography` — the composition the library already has. A
`Divider.Label` would put a layout inside a line.

`variant` is the emphasis ladder narrowed to the three separator tokens, in the order they
get more visible: `default` between two rows of a list, `secondary` between two groups,
`tertiary` between two sections. **No status families and no `primary`** — a rule reports
nothing, and a separator painted in the accent is a decision about the accent, which is
what `color` is for. **No `ghost`**, because a rule with no ink is a gap on the parent.

**`alignSelf: 'stretch'` serves both orientations**, and that one line is the whole
mechanism: in a `Column` the cross axis is horizontal so a stretched child is full width,
in a `Row` it is vertical so the same word makes a vertical rule full height, and on the
axis the thickness fixes it is ignored. So there is no `width` or `height` to keep in sync,
and a horizontal divider written inside a `Row` collapses on purpose rather than guessing.

That is also why the recipe has no `size × orientation` compounds: the `size` axis writes
both keys blind and the `orientation` axis, declared second, releases the wrong one. Four
lines and two, instead of eight.

`asChild` is there as R12 requires, and it earns its place on this component: an
`Animated.View` that collapses a section takes the thickness and the ink from the recipe and
the height from a shared value.

`size` is the thickness — `xs` is HeroUI's `thin`, one device pixel, and `lg` is their
`thick`, six points. **It defaults to `xs`**, the one place in the library that does not
default to `md`: a rule you notice is a rule that is too thick.
