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

**The ripple now draws.** It never did, and the cause was structural: the touch handlers
were on the `Pressable`, which owns the responder system and swallows raw touch props. They
belong on the ripple overlay's own `View` — that is how HeroUI does it, and it is the whole
fix. The ripple is self-contained again: it measures itself, keeps its own two waves, and
asks the root for nothing but the blanket `animation` setting.

Its ink stays the component's job, because a primitive cannot know what it sits on. The
default is the theme's `foreground` at `0.12`, which reads on a neutral surface and
disappears on a saturated one; a component picks `feedbackVariant="scale"` and gives the
wave the contrasted colour its variant already resolved, through `Ripple`'s `style` — which
reaches the wave again rather than the container.
