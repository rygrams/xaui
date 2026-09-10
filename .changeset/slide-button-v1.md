---
'@xaui/native': patch
---

`SlideButton` — slide-to-confirm, the `Slider`'s gesture without the value (P5.35d)

The button you drag rather than tap, for the action that must not happen by accident: the
thumb runs a `Gesture.Pan` on the same optional `react-native-gesture-handler` peer the
`Slider` reaches for, the pill measures its own width on layout, and the travel is inset by
the thumb at each end — but there is no `min`, `max` or `step`, because the only positions
that mean anything are "not yet" and "done".

`onConfirm` fires once when the thumb passes `threshold` (0.9 by default); below it the
thumb springs home. Uncontrolled it is a one-shot and stays confirmed; pass `isConfirmed`
to drive and re-arm it. Everything the finger does stays on the UI thread — the offset is a
shared value the fill and the disc read — with a single `runOnJS` hop on release.

`<SlideButton>Slide to confirm</SlideButton>` composes the fill, label and thumb from a
bare string; the slots — `SlideButton.Fill`, `SlideButton.Label`, `SlideButton.Thumb`,
`SlideButton.Icon` — are there to drop the trail or put a mark in the disc. The ten flat
variants, `size` on the height and the type only, and a `color` that lands on the pill but
never on the surface-coloured disc. The built-in chevron is drawn from two borders and
flips itself under RTL; a drag reaches a screen reader through an `activate` action rather
than an `onPress`.
