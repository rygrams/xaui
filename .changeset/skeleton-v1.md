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

`variant` narrows to the two backgrounds a placeholder is ever drawn on: `default`, the
neutral fill, for a block on the page, and `secondary`, that fill at half, for a block on a
surface that already carries one — where the full fill reads as a hole. **No status
families and no `primary`**, because a skeleton reports nothing and a placeholder in the
accent announces the brand where there is nothing yet to announce; **no `tertiary` and no
`ghost`**, because a skeleton with a border and no fill is an empty box.

HeroUI reaches the same grey from `muted` at 30% opacity. Naming the token instead is what
lets a theme move the skeleton by moving `default`, rather than by discovering that a
percentage of a text colour is where the placeholder grey came from.

**No shimmer**, where HeroUI's default is one: a shimmer is a gradient sweeping across the
block, a gradient needs `react-native-svg`, and that is an optional peer a component in the
core cannot require. One animation, so `animation` is a boolean rather than a name to
choose between — the block breathes between full opacity and a half, a second each way.

**No `asChild`** (R12), and the reason is `children`: here it means the content the block
stands in for, and `asChild` would need it to mean the element to merge the block's styles
into. One `children` with two meanings, disambiguated by a second prop, is the kind of API
this library exists not to ship.

`isLoading={false}` renders `children` and nothing around them, which is what makes the
component a gate rather than a shape you mount and unmount around your own content.
