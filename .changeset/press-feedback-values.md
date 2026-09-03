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

The wash goes to `0.1` over 200ms. The ripple is Material's `InkRipple` rather than an
approximation of it: full ink in 75ms held while the circle keeps growing, a circle starting
at 30% of its target instead of at a point, a target radius of half the diagonal, and a
centre travelling from the finger to the middle of the control. The expansion runs a second
while the finger is down and finishes in 225ms once it lifts, so the wave catches up rather
than being cut.

**The ripple now draws, and the waves belong to the root.** It never drew, and the first fix
was wrong: the handlers went onto the overlay's own `View`, which only hears touches that
land on _it_. The overlay is a sibling of the component's children, not their parent, so a
ripple worked on a button's padding and did nothing on its label — a bug that looks like a
rendering problem. Touches bubble to the `Pressable`, so that is where the handlers live;
the root drives the two waves and publishes them, and the overlay only draws them.

**`feedbackVariant` is gone, and overlays are composed.** The prop named a cross-product in
a string — `scale`, `highlight`, `ripple`, `scale-highlight`, `scale-ripple`, `none` — which
could name five of the six combinations it had and none of the ones a third overlay would
add. A wash and a wave together, which is what Material actually does, was unreachable.

The root scales, and anything laid over it is a part that wraps what it sits under:

```tsx
<PressableFeedback isPressed={isPressed} style={styles.root}>
  <PressableFeedback.Ripple>
    <Label />
  </PressableFeedback.Ripple>
</PressableFeedback>
```

**Wrapping costs nothing**, which is the part worth knowing: the children are not boxed.
They come back as siblings of the wave's layer in a fragment, which has no presence in the
host tree, so the root's `flexDirection`, `gap` and `alignItems` still reach them directly
and the rendered tree is identical to writing the overlay as a bare sibling. A real wrapping
`View` would have been the trap — the root's layout would apply to the wrapper, the
primitive would need to be handed the row's `gap` to give it back, and it would add the view
depth §8 removed.

Written bare, `<PressableFeedback.Ripple />` is that sibling and **order does not matter**:
the root pulls its bare overlays out and paints them under everything else, so one written
after the label does not end up on top of it — a 10% wash over text is subtle enough to ship
by accident. A wrapping overlay is left where it is, since it already contains its content.
`markOverlay` is exported, so a third party's own overlay part gets the same treatment.

This is also the only shape that survives `asChild`, and that was a real hole: the caller's
element _is_ the pressable there, so the primitive has no sibling to inject and mounted no
overlay at all. An `asChild` control could not have one. Now the caller renders it.

**`Button` drops `feedbackVariant` rather than renaming it.** It has one treatment and
always did: the recipe's `pressed` state paints the variant's own pressed colour, so a wash
on top would darken the control twice. It scales, and mounts nothing.

**The ink and the corners are resolved, not configured.** The root flattens its own `style`
once and publishes both: `backgroundColor` decides the contrasting ink, and the radius keys
decide the shape an overlay clips itself to. A purple fill gets light ink, a pale surface
gets dark ink, and a translucent `…Soft` token or no background at all falls back to the
theme's `foreground` — honest, because the control is showing what is behind it. The perf
harness caught that `contrastOn` throws on the `rgba()` those soft tokens carry, which would
have crashed every soft variant on first press.

Carrying the clip on the overlay rather than on the root fixes a second thing: the root no
longer sets `overflow: 'hidden'`, so a child that legitimately overflows — a badge on a
button's corner — is no longer cut by a decision about the press.

`inkFor`, `radiusFrom` and `partitionOverlays` are pure and tested, as are `pressScaleFor`,
`rippleRadiusFor`, `resolveAnimation` and `resolveSlotAnimation` — thirty-four assertions
where the docs previously claimed a test that did not exist. Three carry a decision rather
than an implementation: every control travels the same distance in points whatever its
width, a translucent background falls back to the foreground instead of throwing, and a bare
overlay written last comes back first while a wrapping one stays put.
