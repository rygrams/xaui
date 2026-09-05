---
'@xaui/native': patch
---

feat(skeleton): the v1 `Skeleton` — two fills, one pulse, sized by R14 alone

The fourteenth entry of the core. **One node and no slots**: a placeholder is a rectangle,
and there is nothing inside it to name. A paragraph of them is three of these in a `Column`
— composition doing what a `lines={3}` prop would otherwise hard-code, including the last
line being shorter, which is the only reason the block reads as a paragraph.

**There is no `size`, and that is the design.** Only the caller knows the shape of the
thing that is missing, so R14's `width` and `height` are the whole sizing API — full React
Native names and values, `width="60%"` as readily as `width={140}`. A `size` token here
would be a scale of rectangles nobody's content happens to be.

**No `variant`.** It had two — the neutral fill and that fill at half — sold as the two
backgrounds a placeholder is drawn on. Measured against every surface in both modes, the
second is _less_ visible than the first everywhere, so it was never the answer to "this
block reads as a hole" — the full fill is the more visible of the two on the very surface
that claim named. And on a `secondary` `Card` in dark mode both resolve to that surface's
own `#27272a` and vanish, which is the case the pair existed to cover.

A skeleton has to contrast with whatever sits under it, and a fixed token cannot know what
that is: two frozen values were never going to cover three surfaces times two modes. The
block paints `default` — the neutral fill the rest of the library uses for a `secondary`
`Button`, and the grey HeroUI reaches from `muted` at 30% — and `color` is the way past it,
honest about being a raw value rather than a name that promises a system.

**No `asChild`** (R12), and the reason is `children`: here it means the content the block
stands in for, and `asChild` would need it to mean the element to merge the block's styles
into. One `children` with two meanings, disambiguated by a second prop, is the kind of API
this library exists not to ship.

`isLoading={false}` renders `children` and nothing around them, which is what makes the
component a gate rather than a shape you mount and unmount around your own content.

The demo gains the two shapes a placeholder is actually written as: **a card** — the
skeleton _inside_ a real `Card`, so the padding, the radius and the gaps are the card's and
only what fills them changes on load — and **a list** of four rows, where the rhythm is the
point and the line widths differ so the rows do not read as a loading bar. Both toggle back
to their loaded content on a press, which is the only way to see that nothing shifts.

The list sits on a `default` card rather than a `secondary` one, and that is worth knowing:
in dark mode `default` and `surfaceSecondary` are the same `#27272a`, so a `default`
skeleton on a `secondary` card is invisible — and the `secondary` skeleton, being that fill
at half, is worse. The variant ladder has no answer on that surface.
