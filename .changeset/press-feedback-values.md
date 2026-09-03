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

**`PressableFeedback` loses its compound parts, and `feedbackVariant` becomes `variant`.**
The primitive has one variant to name, so it does not carry a longer word forever; a
component that forwards it renames it, and `Button` keeps `feedbackVariant` because there
`variant` already means the ten sanctioned appearances.

The variant now names two independent things, **read off the name** rather than matched
against a table: `scale…` scales, `…highlight` or `…ripple` mounts that overlay, and they
combine. So the set is `scale`, `highlight`, `ripple`, `scale-highlight`, `scale-ripple`
and `none` — a wave with no scale costs one entry, not a branch.

`Highlight` and `Ripple` are internal now. They existed so a component could give the
overlay an ink its surface needed, and that is **resolved** instead: the root flattens its
own `style`, reads `backgroundColor` and takes the contrasting side. A purple fill gets
light ink, a pale surface gets dark ink, and a translucent `…Soft` token or no background at
all falls back to the theme's `foreground`, which is honest because the control is showing
what is behind it.
