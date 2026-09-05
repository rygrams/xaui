---
'@xaui/native': patch
---

`BottomSheet` — Trigger · Overlay · Content · Handle · Title · Description · Close

**Built on this library's own peers rather than on `@gorhom/bottom-sheet`**, which is what
HeroUI wraps. A sheet that slides, springs and dismisses is a pan gesture and a shared
value; taking a dependency for that would put a second animation library in every app that
installs one component. What it costs is their snap points and their scroll integration —
both worth having, and both worth their own change rather than a dependency.

**It measures its own height, then slides that far.** A sheet is as tall as what is in it
and nothing else on the screen knows that number, so the first layout is what tells the
animation how far "down" is. Until it has one the sheet waits off-screen at a pessimistic
distance rather than flashing at its resting place for a frame.

**Far enough or fast enough.** Past `dismissThreshold` of its own height it closes; so does
a flick over 900 points a second, whatever the distance. Without the second, a quick flick
from the top of a tall sheet is refused however clearly it meant to throw the thing away.
The drag is downward only: a sheet dragged up is already against the top of its own content,
and letting it stretch there is a rubber-band nobody asked for.

**Two separate refusals.** `isSwipeable={false}` on the content and `isDismissable={false}`
on the overlay, because a sheet that can be tapped away but not dragged is a real design and
so is the reverse.

**`BottomSheet.Handle` is written by the caller.** It is the only thing telling a reader the
sheet can be dragged — the gesture has no other affordance — so a sheet with the drag turned
off should not be advertising it.

`radius` moves the **top** corners only, which is why this component does not use
`radiusAxis`: that helper writes `borderRadius`, and a sheet's lower corners are off the
screen. Rounding them would put two arcs against a straight edge nobody can see.

It completes what the `Dialog` started: `Select.Content` and `Menu.Content` are written
around a `presentation` prop that needed both.
