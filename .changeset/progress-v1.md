---
'@xaui/native': patch
---

feat(progress): `ProgressBar` and `ProgressCircle` — how far along something is

The `Stepper` shipped announcing `progressbar` to a screen reader with no visual progress
component anywhere beside it. These are the two, and they are two rather than one with a
`shape` prop because they share no geometry at all: a bar is a `View` that grows, and a ring
is an SVG path whose dash offset moves. What they do share — the five variants, the clamped
range, `formatOptions`, the 240ms — they share to the number.

**There is no `isIndeterminate` on either.** An unknown duration is a `Spinner`. That is the
split the legacy `Indicator` was two components pretending to be one, and a bar that runs a
loop across itself is a spinner drawn as a line.

**The bar's fill is a child of the rail, not a layer over it.** It grows to a percentage of
the width and the rail clips it, so one `radius` rounds both — an overlay would have needed
a corner of its own and would have got it wrong at 100%. Its `size` is the rail's thickness
and never its width, for the `Button`'s reason.

**The circle's `radius` is a number**, and it is the one place in this library where the
word means what it means in geometry: a circle has no corner to round. It is raw, so it sits
outside the style cache and wins over `size` the way a raw `color` wins over a variant's
token — R6 keeps the ladder a vocabulary, and the escape hatch gets its own name. So does
`strokeWidth`, and both are clamped: a stroke thicker than the ring is wide draws a path
with a negative radius, which renders nothing on one platform with no error anywhere.

The arc is a **dash offset on one path** rather than a shape rebuilt per value, which is
what keeps one rounded cap at each end while it sweeps, and it moves as an animated _prop_
rather than an animated style because `strokeDashoffset` is an SVG attribute. The turn to
twelve o'clock is on the wrapper: `Circle`'s own `originX` / `originY` / `rotation` emit an
invalid DOM property on web.

`ProgressCircle.Indicator` is the first file in the library to import `react-native-svg`,
which stays an optional peer — the component is its own subpath export, so a project that
never renders a ring never pays for it.

Five variants, not ten. `tertiary` and `ghost` are gone because a fill with no fill is not a
progress bar, and the `*-soft` pairs because the rail already is the soft half of every one
of them. The rail is the same neutral under all five: it is the room left to go, and that is
not success, warning or danger.

`utils/progress.ts` is new and tested: the clamp, and the formatting. **Which number
`formatOptions` formats follows the style** — the fraction for a percentage, the value for
anything else — because formatting the fraction as euros reports a 1 250 € goal as 0,63 €.
`Intl` missing from a Hermes build without ICU falls back to a plain number rather than
throwing.
