---
'@xaui/native': patch
---

`Popover` — Trigger · Overlay · Content · Title · Description · Close

A panel anchored to whatever opened it, and the component the `Select` was written before.

**Four sides, where the `Select` has two.** A select's list is as wide as the field it
drops out of, and one hanging off the side of that field reads as a menu; a popover belongs
to nothing, so `placement` takes `start` and `end` as well. `width` defaults to
`content-fit` rather than `trigger` for the same reason — matching the width of a word or
an icon would give the panel no room at all.

**No `variant`.** A popover is the theme's floating surface: no emphasis to report, no
intent to carry, so a variant would name a decision nobody makes.

### Four things move out of the `Select` and become shared

§2 bis, at the second use rather than by anticipation:

| moved                             | to                               |
| --------------------------------- | -------------------------------- |
| the placement arithmetic          | `utils/placement.ts`             |
| the trigger's measurement         | `hooks/use-anchor-ref.ts`        |
| the measuring pass and the origin | `hooks/use-anchored-position.ts` |
| the entrance and exit keyframes   | `system/anchored/`               |

The arithmetic gained the two horizontal sides on the way, which is a real generalisation
rather than a rename: on a vertical side the room bounds the panel's **height**, on a
horizontal one it bounds its **width** and the height is bounded by the screen instead. A
panel beside its trigger can be as tall as the window allows. Seven more tests cover it, on
top of the twelve the vertical sides already had.

Two of the four exist because of bugs rather than tidiness, and both would have been
rewritten wrong in `Menu`, `SubMenu` and `Tooltip`. The trigger measures again on every
open, because `onLayout` never fires on scroll and a trigger inside a `ScrollView`
otherwise reports where it used to be. And the position is computed in the **host's**
coordinates rather than the window's, because the trigger reports itself against the window
while the panel is laid out inside the `PortalHost`.

The `Select`'s chevron spring moves to `system/anchored` too, where the `Accordion` already
reads it.
