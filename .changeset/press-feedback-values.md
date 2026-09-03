---
'@xaui/native': patch
---

Fix the press scale, which lurched on wide controls, and align the touch feedback with
HeroUI's values.

**The scale was a flat `0.975` for every control.** What the eye reads is the displacement,
not the ratio: that same ratio moves a 360pt row nine points and a 96pt chip two. It is now
`0.985` adjusted by a width coefficient, so the movement stays roughly constant in points
whatever the control's width — the reference width is 300pt, and `pressScaleFor` carries the
arithmetic with a test that asserts a chip and a full-width row travel the same distance.
The curve is 300ms eased out, in both directions, instead of 100ms in and 150ms out.

The wash goes to `0.1` over 200ms, and the ripple to `0.1` over a duration proportional to
the control's diagonal — 1000ms at a 450pt diagonal, clamped to `[750, 2000]` so neither a
chip flickers nor a card crawls.

The ripple itself still draws nothing (P2.5). Its geometry no longer depends on a shared
value read inside a worklet — the radius is laid out from React state, so a zero radius can
no longer masquerade as a broken effect — and it is driven from the raw touch rather than
from `onPressIn`, which waits for a responder grant that never arrives inside a
`ScrollView`. Neither made it appear; the remaining suspect is written up in
`P2-API-REVIEW.md` §D.
