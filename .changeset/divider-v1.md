---
'@xaui/native': patch
---

feat(divider): the v1 `Divider` — no variant, one `alignSelf` for both axes

The thirteenth entry of the core. **One node and no slots**: a rule is a filled box one
point thick, and there is nothing inside it. A divider with a word across it is a `Row`
holding two of these and a `Typography` — the composition the library already has. A
`Divider.Label` would put a layout inside a line.

**No `variant`**, and this is the only component in the core without one. A variant is the
design system's vocabulary (§1 bis) — a name that means the same thing everywhere it
appears — and on a rule there is nothing for such a name to describe: no fill against a
foreground, no border against a surface, no intent to report. It briefly had three, naming
the three separator tokens, which is a shade of grey wearing a word. `size` says how heavy
the rule is and `color` says what colour it is, in React Native's own values; between them
there is nothing a third name would add. The theme still sets the default — the rule paints
`separator`.

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
