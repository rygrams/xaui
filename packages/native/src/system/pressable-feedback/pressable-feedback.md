# PressableFeedback

What a control does under the finger, written once instead of forty-seven times. Every
pressable component renders it — `Button`, `Chip`, a clickable `Card`, `ListItem`,
`MenuItem`, `SegmentButton`.

## Import

```tsx
import { PressableFeedback } from '@xaui/native/system'
```

## Anatomy

```tsx
<PressableFeedback>
  <PressableFeedback.Ripple>{children}</PressableFeedback.Ripple>
</PressableFeedback>
```

**The root scales; overlays are composed.** No prop names what to mount, because a name is
a cross-product: `scale-ripple` and `scale-highlight` could say five of their six
combinations and none of the ones a third overlay would add. A wash _and_ a wave — what
Material actually does — was unreachable.

### An overlay wraps, and it costs nothing

Wrapping is the readable form: it says what the wave sits under instead of leaving a bare
element floating among the children.

It does **not** box the content. The children come back as siblings of the overlay layer in
a fragment, which has no presence in the host tree, so the rendered result is identical to
writing the overlay as a bare sibling:

```tsx
<PressableFeedback style={{ flexDirection: 'row', gap: 8 }}>
  <PressableFeedback.Ripple>
    <Icon />
    <Label />
  </PressableFeedback.Ripple>
</PressableFeedback>
```

```
Pressable          ← flexDirection, gap and alignItems live here
├── View           ← the wave's layer, position: absolute, out of flow
├── Icon           ← still a direct child: the gap reaches it
└── Label
```

A real wrapping `View` would have been the trap: the root's layout would apply to the
wrapper rather than to the icon and the label, the primitive would need to be told the
row's `flexDirection` and `gap` to give them back, and it would add the view depth §8
removed.

### Or bare, in any order

`<PressableFeedback.Ripple />` on its own is a sibling among the root's children, and
**order does not matter** — the root pulls its bare overlays out and paints them under
everything else, wherever they were written. Leaving that to source order would have put a
`Ripple` written after the label on top of it — a 10% wash over text, subtle enough to ship
by accident.

Two limits, both deliberate:

- A **wrapping** overlay is left where it is. It already contains what it sits under, so
  hoisting it would drag that content ahead of the root's other children.
- Only **direct** children are inspected. An overlay inside a `Fragment` keeps source
  order, because lifting a fragment's children into their parent's list would re-key them
  into a sibling fragment's range.

What an overlay needs from the surface is still **resolved rather than configured** — the
ink and the corners come from the root through context, not from props on the part.

### Scale and an overlay, together

The scale is the root's own transform and it is **on by default**, so a wave _and_ a
shrink is the anatomy at the top of this page with nothing added to it:

```tsx
<PressableFeedback isPressed={isPressed} style={styles.root}>
  <PressableFeedback.Ripple>
    <Icon />
    <Label />
  </PressableFeedback.Ripple>
</PressableFeedback>
```

Switch one off with the blanket prop — `animation={{ scale: false }}` for the wave alone,
and no overlay at all for the shrink alone.

Two overlays stack by **nesting**, and the nesting _is_ the stacking order: the outer one
paints first, underneath.

```tsx
<PressableFeedback.Highlight>
  <PressableFeedback.Ripple>
    <Label />
  </PressableFeedback.Ripple>
</PressableFeedback.Highlight>
```

Wash, then wave over it, then the label — Material's own order, and it costs no depth:
both overlays return fragments, so the three still land as direct children of the root.

### Why there is no `PressableFeedback.Scale`

The asymmetry is real rather than an oversight — the scale transforms the **surface**,
which is the view carrying the background and the corners.

A wrapping `<Scale>` could only transform its own subtree, leaving the root's fill and the
wave's absolute-fill layer behind while the label shrank away from them — and it would
need a real `View` to do even that, the layout box the wrapping form above exists to
avoid. A bare `<Scale />` marker configuring the root fails somewhere else: under
`asChild` it sits inside the caller's element, where the root cannot see it. An overlay
reads context, and context descends; a config child would have to travel up.

So the line is: **what composes is what is drawn over the surface, and what belongs to the
surface stays a prop.**

## Usage

### The normal case

A component owns the press state, because its recipe resolves on it (R5) and it needs the
value before it renders. This applies that value; it does not decide it.

```tsx
const [isPressed, press] = usePressState(props)
const styles = recipe.resolve({ theme, selection, states: { pressed: isPressed } })

<PressableFeedback ref={ref} isPressed={isPressed} style={[styles.root, style]} {...press}>
  <Label />
</PressableFeedback>
```

That component mounts no overlay, which is a decision — see below. One that wants a wave
wraps its content in it:

```tsx
<PressableFeedback
  ref={ref}
  isPressed={isPressed}
  style={[styles.root, style]}
  {...press}
>
  <PressableFeedback.Ripple>
    <Label />
  </PressableFeedback.Ripple>
</PressableFeedback>
```

### Pick one pressed treatment, never two

This is the rule that decides how a component looks under the finger, and getting it wrong
is not subtle:

- **A `pressed` state in the recipe**, swapping `bg` for `bgPressed`. The control's own
  colour goes down. `Button` does this, and therefore renders no overlay.
- **An overlay**, `Highlight` or `Ripple`. The control keeps its colour and something is
  laid over it.

Both at once and they fight: two things move at the same time, often in opposite
directions, and the eye reads neither. A fill that lightens on press under a wave that
darkens cancels out almost exactly.

### The parts

| Part                          | What it draws                                     |
| ----------------------------- | ------------------------------------------------- |
| `PressableFeedback.Highlight` | one flat neutral wash, fading in under the finger |
| `PressableFeedback.Ripple`    | a circle washing out from where the finger landed |

Both take a `style` and their own `animation`, and both read their ink and their corners
from the root. Neither is required — the scale is the root's own and needs nothing
rendered.

**Writing your own.** An overlay is any component that reads `useFeedback()` and paints
under the content. `markOverlay` tags it so the root hoists it like ours:

```tsx
import { markOverlay, useFeedback } from '@xaui/native/system'

export const Glow = markOverlay(function Glow() {
  const { ink, corners, progress } = useFeedback()
  …
})
```

The mark is a `Symbol.for`, so two copies of the package in one tree still agree on what an
overlay is. Without it the component still renders — it simply keeps source order, and has
to be written before the content itself.

### `asChild`

Under `asChild` the caller's element _is_ the pressable, so the primitive has nowhere to
inject a sibling. Composition is what makes an overlay possible at all here, and it is why
the context is published above the root:

```tsx
<PressableFeedback asChild isPressed={isPressed}>
  <Link href="/projects">
    <PressableFeedback.Ripple />
    <Label />
  </Link>
</PressableFeedback>
```

### `animation`

```tsx
<PressableFeedback animation={false} />              // nothing animates here
<PressableFeedback animation="disabled" />           // the same
<PressableFeedback animation="disable-all" />        // and for every descendant
<PressableFeedback animation={{ ripple: false }} />  // one sub-animation off
```

**Off means no worklet.** `false` and `'disabled'` render a _different component_, not the
same one with a branch inside — hooks cannot be conditional, and "mounts no worklet" is only
true if the Reanimated hooks are never reached.

`'disable-all'` travels through context, so a long list switches off every row's worklets
with one prop instead of threading it down.

Each overlay also takes its own `animation` — `false` to switch that one off, or a
`duration` and an `opacity` — which wins over the blanket prop on the root, except when the
root switched everything off.

## The motion, and why the numbers are what they are

### Scale

`0.985`, **adjusted by the control's width**:

```ts
1 - (1 - 0.985) * (300 / width)
```

A flat ratio is the obvious thing to write and it is wrong: the same `0.975` moves a 360pt
row nine points and a 96pt chip two, and what the eye reads is the displacement, not the
ratio. Wide controls lurched. The coefficient keeps the travel roughly constant in points
across a chip and a full-width button. 300ms, eased out, in both directions.

### Highlight

The theme's `foreground` at `0.1`, over 200ms. A neutral wash — it is not the variant's
pressed colour, because that is the other treatment.

### Ripple

Taken from Material's reference implementation (`InkRipple`), and four of its numbers are
load-bearing while none is obvious:

- **The ink is independent of the expansion.** Full opacity in 75ms, held while the circle
  keeps growing. Tying the two — again, the obvious thing — leaves the ink faintest exactly
  when the circle is small enough to read _as_ a circle, which is why such a ripple looks
  like nothing at all.
- **The circle starts at 30% of its target**, not at a point. A wave from a dot spends its
  visible life too small to see.
- **The target radius is half the diagonal**, which is what covers the box. Larger and the
  edge leaves the control before the eye catches it, so it reads as the surface tinting
  rather than as something spreading.
- **The centre travels** from the finger to the middle of the control as it opens, which is
  what makes it settle in instead of flooding out of a corner.

The expansion runs a full second while the finger is down and finishes in 225ms once it
lifts — the wave catches up rather than being cut. The ink then waits 225ms and leaves over
150ms.

### The ink, and the corners

**Resolved, never configured.** The root flattens its own `style` once and publishes two
things an overlay would otherwise have to be told.

The **ink**: `backgroundColor` decides the contrasting side, through the same `contrastOn`
the theme uses to derive a tint. A purple fill gets light ink, a pale surface gets dark ink,
and a `ghost` with no background — or a translucent `…Soft` token, which is an `rgba()` and
has no luminance to read — falls back to the theme's `foreground`. That is honest: the
control is showing whatever is behind it. Only the root knows what an overlay sits on, and
black at 10% over a saturated fill is close to invisible, which is the one thing a press
indicator cannot be.

The **corners**: an absolute fill is square and every control here is rounded, so an overlay
copies the root's radius and clips itself to it. The clip is the overlay's rather than the
root's on purpose — a root that set `overflow: 'hidden'` would also cut a child that
legitimately overflows, a badge on a button's corner, over a decision about the press.

## Two things that are not obvious in the implementation

**The root drives the ripple, the overlay only draws it.** The root is the touch surface,
and that is not a detail: touches on a component's own children — a button's label — bubble
up to the `Pressable`, never to the overlay, which is their _sibling_ rather than their
parent. An overlay carrying its own handlers ripples on the padding and does nothing on the
text, which looks like a rendering bug and is not one. The overlay reads the waves from
context and sets `pointerEvents: 'none'` **in its style** — the prop form is deprecated, and
this is not decoration: an overlay that ate touches would claim every press meant for the
control underneath it.

**`asChild` goes through this component, not around it.** A root doing
`asChild ? Slot : PressableFeedback` would render its child with no touch feedback at all,
so the merge happens here and R12 and the feedback stay in the same branch. The feedback
context is published _above_ the root for the same reason: a `Slot` merges into its single
child, and a provider nested inside would swallow the ref, the style and the handlers.

## Props

### `PressableFeedback`

Everything `Pressable` accepts, minus `style`'s function form, plus:

| Prop         | Type            | Default | Notes                                             |
| ------------ | --------------- | ------- | ------------------------------------------------- |
| `isPressed`  | `boolean`       | `false` | **Controlled.** The root above owns it            |
| `isDisabled` | `boolean`       | —       | R8; forwarded to `Pressable` as `disabled`        |
| `asChild`    | `boolean`       | `false` | Merge into the single child, keeping the feedback |
| `animation`  | `AnimationProp` | —       | `false` mounts no worklet                         |

`style` is an object or an array, not `Pressable`'s function form: the root above already
owns the press state and publishes it through context, so the function form would be a
second, quieter source of truth.

### `PressableFeedback.Highlight` and `PressableFeedback.Ripple`

| Prop        | Type            | Default | Notes                                          |
| ----------- | --------------- | ------- | ---------------------------------------------- |
| `style`     | `ViewStyle`     | —       | On `Ripple`, the wave — not the container      |
| `animation` | `SlotAnimation` | —       | `false`, or a `duration` and an `opacity`      |
| `children`  | `ReactNode`     | —       | The content it sits under; siblings, not boxed |

`children` survives every branch, including the disabled one. An overlay that dropped them
when `animation={false}` switched it off would delete the control's own label.

Neither takes a colour or a radius: both come from the root, which is the only thing that
knows what the overlay sits on.

## Testing

None for the components. Not for the root, not for its overlays — they are verified on
`apps/demo`'s **PressableFeedback (v1)** screen, in light and dark. A timing that is right
is right on screen, not in an assertion.

The pure functions are tested, in `__tests__/system/pressable-feedback/`: `pressScaleFor`,
`rippleRadiusFor`, `resolveAnimation`, `resolveSlotAnimation`, `inkFor`, `radiusFrom` and
`partitionOverlays`. Three assertions there carry a decision rather than an implementation:

- every control travels the same distance in points whatever its width;
- a translucent background falls back to the foreground instead of throwing;
- an overlay written last comes back first, and a component with none keeps its children
  untouched rather than re-keyed.
