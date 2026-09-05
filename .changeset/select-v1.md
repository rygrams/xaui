---
'@xaui/native': patch
---

`Select` — Trigger · Value · Indicator · Overlay · Content · Label · Item

A field that opens a list, and the first component in the library to use the `Portal`.
Its trigger is the `TextField`'s twin — the same `field*` tokens, the same four levels,
the same heights — so a select and a text input in one form read as one control rather
than as two libraries meeting.

The visual values and the motion are HeroUI Native's, not the legacy component's. The
chevron turns 0 to −180° on their spring (damping 140, stiffness 1000, mass 4): heavily
damped against a very high stiffness, so it arrives in a fifth of a second without
overshooting, because an oscillating chevron reads as a bug rather than as motion. The
panel grows out of the trigger at 200 ms from `scale: 0.95`, offset eight points towards
it, and leaves in 150 ms — a dismissal as long as the opening feels like the control is
arguing.

**The root renders no node**, which is where this component departs from every other one.
The trigger is the control, so `ref`, `style`, `testID`, the a11y props and R14's style
props are all on `Select.Trigger`. A wrapper view would have existed only to receive props
the field already takes.

**`XAUIProvider` now mounts a `PortalHost`.** The provider README always said the host
belonged there "later", and later is the first component that opens an overlay. It is not
left to the app because forgetting it is silent: `Portal` renders nothing outside a host,
so a select would open onto an empty screen with no error to read. `hasPortalHost={false}`
turns it off for an app that needs the host under a gesture root or inside its own
navigation container.

The panel measures itself invisibly for one frame before it places itself. That frame is
what `avoidCollisions` costs: without a measured height there is nothing to compare, and a
list too tall for the room below would open downwards off the screen. The arithmetic is a
pure function with a test — placement is the one part of this component that is maths
rather than rendering.

`size` is `sm`, `md` or `lg` — no `xs`. A trigger that small has to hold a value, a
chevron and the gap between them, and at that height the value gets nothing. The
`TextField` keeps its `xs` because a field only has to hold text.

The panel's corner is `2xl`, not `3xl`. HeroUI's is their `--radius-3xl` on a base of 8,
which is 24 points; our base is 12, so the same 24 is `2xl`. Reading their key rather than
their number put a 36-point corner on it and made it read as a pill.

Two narrowings against HeroUI, both deliberate. `placement` is `top` or `bottom` only: a
list as wide as its own field hanging off the side of it reads as a menu, and `start` and
`end` belong to `Popover`. And there is no `presentation` prop — the bottom-sheet and
dialog presentations need `BottomSheet` and `Dialog`, which do not exist yet.

`selectionMode` does not come across from the legacy component. A select that returns
several values is a different control with a different affordance; calling both by one
name is what made the legacy props list as long as it is.
