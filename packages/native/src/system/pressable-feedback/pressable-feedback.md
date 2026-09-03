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
<PressableFeedback variant="scale-ripple">{children}</PressableFeedback>
```

One component, one prop. There are no compound parts: the overlays are internal, and the
one thing a caller would have wanted to set on them — the ink — is **resolved rather than
configured**, so there is nothing left to reach in and change.

## Usage

### The normal case

A component owns the press state, because its recipe resolves on it (R5) and it needs the
value before it renders. This applies that value; it does not decide it.

```tsx
const [isPressed, press] = usePressState(props)
const styles = recipe.resolve({ theme, selection, states: { pressed: isPressed } })

<PressableFeedback
  ref={ref}
  isPressed={isPressed}
  variant="scale"
  style={[styles.root, style]}
  {...press}
>
  <Label />
</PressableFeedback>
```

### Pick one pressed treatment, never two

This is the rule that decides how a component looks under the finger, and getting it wrong
is not subtle:

- **A `pressed` state in the recipe**, swapping `bg` for `bgPressed`. The control's own
  colour goes down. `Button` does this, and therefore asks for `variant="scale"`.
- **An overlay**, `Highlight` or `Ripple`. The control keeps its colour and something is
  laid over it.

Both at once and they fight: two things move at the same time, often in opposite
directions, and the eye reads neither. A fill that lightens on press under a wave that
darkens cancels out almost exactly.

### `variant`

| Value             | What is mounted                                             |
| ----------------- | ----------------------------------------------------------- |
| `scale-highlight` | scale + a `Highlight`                                       |
| `scale-ripple`    | scale + a `Ripple`                                          |
| `scale`           | scale alone — pick this to render your own overlay, or none |
| `none`            | nothing moves                                               |

`scale` is what a component picks when it wants to style its overlay: no prop here reaches
into another component's insides (R1), so you render the overlay yourself.

### `animation`

```tsx
<PressableFeedback animation={false} />              // nothing animates here
<PressableFeedback animation="disabled" />           // the same
<PressableFeedback animation="disable-all" />        // and for every descendant
<PressableFeedback animation={{ ripple: false }} />  // one sub-animation off
```

**Off means no worklet.** `false`, `'disabled'` and `variant="none"` render a
_different component_, not the same one with a branch inside — hooks cannot be conditional,
and "mounts no worklet" is only true if the Reanimated hooks are never reached.

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

### The ink

**Resolved, never configured.** The root flattens its own `style`, reads `backgroundColor`
and takes the contrasting side — the same `contrastOn` the theme uses to derive a tint. A
purple fill gets light ink, a pale surface gets dark ink, and a `ghost` with no background
falls back to the theme's `foreground`, which is honest because the control is showing
whatever is behind it.

This is why there is no `Ripple` slot and no colour prop. Only the root knows what the
overlay sits on, so only the root can pick an ink that is visible on it — and black at 10%
over a saturated fill is close to invisible, which is the one thing a press indicator
cannot be.

## Two things that are not obvious in the implementation

**The root drives the ripple, the overlay only draws it.** The root is the touch surface,
and that is not a detail: touches on a component's own children — a button's label — bubble
up to the `Pressable`, never to the overlay, which is their _sibling_ rather than their
parent. An overlay carrying its own handlers ripples on the padding and does nothing on the
text, which looks like a rendering bug and is not one. The overlay is
`pointerEvents="none"` and reads the waves from context.

**`asChild` goes through this component, not around it.** A root doing
`asChild ? Slot : PressableFeedback` would render its child with no touch feedback at all,
so the merge happens here and R12 and the feedback stay in the same branch. The feedback
context is published _above_ the root for the same reason: a `Slot` merges into its single
child, and a provider nested inside would swallow the ref, the style and the handlers.

Under `asChild` the caller's element _is_ the pressable and there is no sibling to inject,
so the default overlay is not rendered. The scale still applies, because that is on the
element itself.

## Props

### `PressableFeedback`

Everything `Pressable` accepts, minus `style`'s function form, plus:

| Prop         | Type              | Default             | Notes                                             |
| ------------ | ----------------- | ------------------- | ------------------------------------------------- |
| `isPressed`  | `boolean`         | `false`             | **Controlled.** The root above owns it            |
| `isDisabled` | `boolean`         | —                   | R8; forwarded to `Pressable` as `disabled`        |
| `asChild`    | `boolean`         | `false`             | Merge into the single child, keeping the feedback |
| `variant`    | `FeedbackVariant` | `'scale-highlight'` | The table above                                   |
| `animation`  | `AnimationProp`   | —                   | `false` mounts no worklet                         |

`style` is an object or an array, not `Pressable`'s function form: the root above already
owns the press state and publishes it through context, so the function form would be a
second, quieter source of truth.

## Testing

None. Not for this component, not for its overlays, not for its animation constants — it is
verified on `apps/demo`'s **PressableFeedback (v1)** screen, in light and dark. A timing
that is right is right on screen, not in an assertion. The two pure functions that compute a
value, `pressScaleFor` and `rippleRadiusFor`, do have tests.
