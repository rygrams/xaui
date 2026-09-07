---
'@xaui/native': patch
---

`RadialChart` — several quantities, each as far round its own ring as it has got

P5.34h, net new, no legacy equivalent. `@xaui/native/radial-chart`, and the family's sixth
figure.

**A ring is not a slice.** The `PieChart` splits one quantity into shares that add up to the
whole; this draws several quantities that have nothing to do with each other, each against a
target of its own. Calories, steps and minutes do not sum to anything, and a donut of the
three would be drawing a total nobody measured — which is why this is a component and not a
`PieChart` prop.

**The first row is the outermost ring**, and the palette walks the rows in that order.

**Each ring has its own target.** `maxKey` names the column that holds it, `maxValue` is one
target for all of them, and with neither the largest value in the data becomes the top — so
the biggest ring closes and the rest are read against it, the `RadarChart`'s rule for the
`RadarChart`'s reason.

**The track is the rest of the distance.** Without it a ring at a fifth is an arc floating
in space with nothing saying how far it had to go. Every track is drawn before every ring,
so a rounded cap is never cut by the ground of the one inside it.

**The rings thin rather than disappear.** The stroke is centred on the path, so a ring drawn
at the box's own radius loses its outer half to the canvas edge, and six series at the
default thickness ask for more room than a phone-sized figure has. `radialRings` clamps the
gap to half the room and divides what is left, with a test for each case — what gives is the
thickness, because the alternative is a chart that silently drops its innermost rings.

The arc is a **dash offset**, not a path rebuilt per value, which is what lets a ring be one
stroke with one rounded cap at each end; the quarter turn to twelve o'clock is on the
canvas's **wrapper**, `ProgressCircle`'s arrangement, because `Circle`'s own `rotation` prop
emits an invalid DOM property on web — and because it leaves the middle upright. The middle
itself is `children` in a `View` laid over the canvas, the `PieChart`'s arrangement.
`progressFraction` does the value-to-arc conversion, its third caller after the two
progress components.
