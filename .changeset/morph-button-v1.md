---
'@xaui/native': patch
---

`MorphButton` — Collapsed · Expanded · Label · Title · Description · Icon

P5.35c, net new. A button that changes shape: a pill at rest, a card once it is open.

**One box, two contents.** The pressable *is* the shape that travels, and exactly one face
is mounted at a time — so the box takes its size from whichever that is, and Reanimated's
layout transition animates it between the two. Nothing is measured, which is the
`Accordion`'s rule applied to a control's own box: a card whose sentence arrives from the
network grows with it, instead of being stuck at the size it had when it was measured.

That is also why `PressableFeedback` gained a `layout` prop. The box that travels is the
pressable itself; a transition on a wrapper animates the wrapper's frame while the pressable
inside it is already at its final size, so the content spills out of the shape for the length
of the spring. The root clips (`overflow: 'hidden'`), which turns those same frames into the
shape revealing its content.

**One corner for both shapes**, half the collapsed height. At that height it is exactly a
pill; on the taller card it is a corner in proportion to the control's scale. Two radius keys
would have needed a compound of `size` and `radius` to say what one derived value says once,
and `radius` still overrides it.

**The measurements are on the faces, not on the box** — the collapsed height and side inset
on `Collapsed`, the card's four-sided frame on `Expanded`. Since one face is mounted at a
time, that removes the `size` × `isExpanded` compound the component would otherwise need.

Three sizes, not four: a card that opens out of a 32-point control has less room than the
padding it would need. The `Button`'s seven variants unchanged, its `…Pressed` token for the
press rather than a `Highlight` overlay, and the description turned down by opacity rather
than recoloured — the ground is a raw `color` as often as it is a token.

**No `childrenToString`** (R3), and it is the one component that legitimately skips it: a
bare string could belong to either face, and wrapping it into the collapsed one would build a
button that morphs into an empty card. A missing face warns in development.

`isExpanded` / `defaultExpanded` / `onExpandedChange`, controlled or not. `useMorphButton()`
publishes `toggle`, so a close control inside the card costs no state. The faces fade from
the **second** shape onwards — Reanimated runs an `entering` animation on the first mount as
well, and without that every button on a screen would fade in as the screen arrived.

`Chart` (Donut and Heatmap), `ComposedChart`, `LinkButton` and `BottomSheetInput` are dropped
on the roadmap in the same change.
