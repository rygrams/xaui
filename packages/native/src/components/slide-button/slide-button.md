# SlideButton

A button you drag rather than tap — slide the thumb to the end and it fires once. It is
the confirmation for an action that must not happen by accident.

> **Not part of the 1.0 core.** The fifteen are listed in the plan and this is not one of
> them; it ships under `1.x` as a P5 component.

## Import

```tsx
import { SlideButton } from '@xaui/native/slide-button'
```

## Anatomy

```tsx
<SlideButton onConfirm={unlock}>
  <SlideButton.Fill />
  <SlideButton.Label>Slide to confirm</SlideButton.Label>
  <SlideButton.Thumb>
    <SlideButton.Icon as={ArrowIcon} />
  </SlideButton.Thumb>
</SlideButton>
```

| Slot                | What it is                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `SlideButton`       | The pill. Owns the geometry, the gesture's shared offset and the confirmed state.              |
| `SlideButton.Fill`  | The trail behind the thumb. Optional — compose it for the affordance, omit it for a bare pill. |
| `SlideButton.Label` | The instruction, centred across the whole pill. The thumb slides over it.                      |
| `SlideButton.Thumb` | The handle the finger drags. Draws the built-in chevron, or renders whatever you put in it.    |
| `SlideButton.Icon`  | A mark in the thumb, `system/`'s `Icon` reading the handle's glyph size and colour.            |

**A bare string is the whole component.** `<SlideButton>Slide</SlideButton>` composes the
fill, the label and the thumb for you. Write the slots out only to drop the fill or to put
a mark in the thumb.

## Usage

### The one-shot

```tsx
<SlideButton onConfirm={submit}>Slide to submit</SlideButton>
```

`onConfirm` fires once, when the thumb reaches the threshold. Uncontrolled, the thumb then
stays at the end — a slide is a one-shot, and springing back would read as the confirm not
having taken.

### Driven, and re-armed

```tsx
const [confirmed, setConfirmed] = useState(false)

<SlideButton isConfirmed={confirmed} onConfirm={() => setConfirmed(true)}>
  {confirmed ? 'Sent' : 'Slide to send'}
</SlideButton>

<Button onPress={() => setConfirmed(false)}>Undo</Button>
```

Pass `isConfirmed` and the thumb follows it: to the end when it is set, home when it is
cleared. Setting it back to `false` re-arms the control.

### The threshold

```tsx
<SlideButton threshold={1} onConfirm={wipe}>
  Slide all the way
</SlideButton>
```

How far along the track the thumb has to reach for the slide to count, from `0` to `1`.
Below it, the thumb springs home on release. The default is `0.9` — far enough to be
deliberate, short enough to forgive the last few points.

### A mark in the thumb

```tsx
<SlideButton onConfirm={pay}>
  <SlideButton.Label>Slide to pay</SlideButton.Label>
  <SlideButton.Thumb>
    <SlideButton.Icon as={CreditCardIcon} />
  </SlideButton.Thumb>
</SlideButton>
```

Anything inside `SlideButton.Thumb` replaces the built-in chevron. `SlideButton.Icon`
inherits the handle's glyph size and — because the handle is the surface colour whatever the
pill does — the theme's foreground.

### Style as props

```tsx
<SlideButton height={64} onConfirm={go}>
  <SlideButton.Label letterSpacing={1}>SLIDE</SlideButton.Label>
</SlideButton>
```

Every node carries R14 — full RN names, full RN values, scoped to the node they are written
on.

## Sizes

| `size` | Height              | Handle                          | Label |
| ------ | ------------------- | ------------------------------- | ----- |
| `sm`   | `controlHeights.sm` | (height − 6) tall, 1.5× as wide | `sm`  |
| `md`   | `controlHeights.md` | (height − 8) tall, 1.5× as wide | `md`  |
| `lg`   | `controlHeights.lg` | (height − 8) tall, 1.5× as wide | `lg`  |

`size` drives the pill's height, the handle and the label's type — **never a width**.
Without an `alignSelf`, the pill fills its column, which is RN's own behaviour and the
`Button`'s. The label stays centred across the whole pill at every size.

The handle is a **horizontal stadium**, wider than it is tall: a slide-to-confirm handle
is pushed sideways, so it reads as a thing you shove rather than a knob you turn.

It is lifted off the pill by `shadows.surface`, so the chevron on it never has to fight the
pill for contrast — and **`isDisabled` puts that lift down** rather than dimming it with
everything else. Opacity fades the pill until its edges are most of the way to the page,
and a shadow at half strength is then the strongest edge left, sitting a point below a
handle whose own outline has gone: it reads as a handle pressed into a dent rather than as
a faded control. Nothing disabled should look lifted anyway.

For the same reason the pill itself never sets `overflow: 'hidden'`. On iOS that clips the
layer's own shadow, and the handle's lower half reaches the pill's edge exactly. The trail
is cut to the pill's shape by a window one layer in, so the cut lands on the trail alone.

`radius` overrides the pill's corner, which is `full` by default.

## Variants and colour

The ten flat variants, the same vocabulary every control in the library takes — a
slide-to-delete is a real `danger` use, so the intents stay.

| `variant`                        | Pill at rest | Trail    | Label at rest          | Label swept        |
| -------------------------------- | ------------ | -------- | ---------------------- | ------------------ |
| `primary`                        | `accentSoft` | `accent` | `accentSoftForeground` | `accentForeground` |
| `success` / `warning` / `danger` | `<name>Soft` | `<name>` | `<name>SoftForeground` | `<name>Foreground` |
| `secondary`                      | `default`    | wash     | `defaultForeground`    | same               |
| `tertiary`                       | — (`border`) | wash     | `foreground`           | same               |
| `ghost`                          | —            | wash     | `foreground`           | same               |
| `*-soft`                         | `<name>Soft` | wash     | `<name>`               | same               |

`secondary` is the default — the neutral grey pill.

**The four intents rest soft and earn their colour.** A `Button` is its intent the moment
it is on screen, because a tap is the whole interaction. A slide is not: the pill sits
under the thumb saying _not yet_, so `primary`, `success`, `warning` and `danger` open on
their soft slice and name the vivid one as `bgSelected` — the role the recipe engine
already has for "the box once it is on". The trail lays it down as the handle sweeps, so
the colour arrives with the commitment rather than before it.

**The label is drawn twice**, and that is what keeps it readable. No single text colour
survives a pill going from its soft slice to the vivid one: painted for the soft pill it
reads about 1.3:1 against the trail, painted for the trail it is invisible at rest. So the
second copy takes `fgSelected` and is clipped to exactly the trail's width — a word the
trail is halfway through is dark on the half that is still soft and light on the half that
is not. Measured against the default theme, every variant clears AA in both modes: 4.9–6.5
at rest and 4.6–5.0 swept in light, 7.5–10.4 and 6.4–10.2 in dark. Where a variant names no
`fgSelected` both copies resolve to the same colour and the second one changes nothing.

`color` is a raw value (R7). It lands where the variant's tokens do: the pill for the
filled ones, the label for `ghost`, the label and border for `tertiary` — and, because
`resolveTint` maps every declared role, into the trail on the four that name one. **It
never reaches the handle** — the handle stays the surface colour so the chevron on it is
readable whatever the pill is doing.

**The variants that name no vivid slice sweep a wash of their own foreground** instead, at
low opacity — the same colour the label uses, so it reads against every pill without a
token of its own. Either way the trail's width is the swept **fraction** of the travel laid
over the whole pill — nothing at rest, and full at the end. It is not the handle's raw
offset: the handle stops a handle's width short of the trailing cap, because that is where
it physically is, and a trail that stopped with it would leave a confirmed slide showing
unswept pill. How far the slide has come, not the value.

## How it is put together

It is the `Slider`'s gesture without the value. `SlideButton.Thumb` runs a `Gesture.Pan`
on `react-native-gesture-handler` — the same **optional** peer the `Slider` reaches for,
imported by these two components and nowhere else. The pill measures its own width on
layout, and the travel is inset by the thumb and its margin at each end, exactly as the
`Slider`'s rail insets the knob.

Everything the finger does stays on the UI thread: the thumb's offset is a shared value the
pan writes and the fill and the handle both read. The single hop to JS is `runOnJS` on
release, once, when the slide has passed the threshold — the confirm is React state and a
callback, and neither belongs on a worklet.

There is **no `min`, `max` or `step`**, because the only positions that mean anything are
"not yet" and "done".

## Accessibility

- `accessibilityRole="button"`, overridable.
- `accessibilityState` carries `disabled`; a caller's own keys are merged over it.
- **A drag is not available to a screen reader.** The control exposes an `activate` action
  — the way in for VoiceOver and TalkBack — as an `accessibilityAction` rather than an
  `onPress`, so it stays not-tappable-to-confirm for everyone else, which is the point of
  it. Give it an `accessibilityLabel` that says what the slide does.
- Under RTL the thumb travels toward the leading edge and the built-in chevron flips to
  point that way on its own — its lit borders are `top` and `end`.

## Props

Everything a `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop               | Type                   | Default       | Notes                                                   |
| ------------------ | ---------------------- | ------------- | ------------------------------------------------------- |
| `variant`          | `SlideButtonVariant`   | `'secondary'` | The ten flat values                                     |
| `size`             | `'sm' \| 'md' \| 'lg'` | `'md'`        | Height, thumb and label — never a width                 |
| `radius`           | `RadiusKey`            | `'full'`      | The pill's corner                                       |
| `color`            | `string`               | —             | A raw tint — the pill, or the label; never the thumb    |
| `threshold`        | `number`               | `0.9`         | How far to slide, from 0 to 1                           |
| `isConfirmed`      | `boolean`              | —             | Controlled — pins the thumb at the end, or springs home |
| `defaultConfirmed` | `boolean`              | `false`       | The starting state when uncontrolled                    |
| `onConfirm`        | `() => void`           | —             | Fires once, when the thumb reaches `threshold`          |
| `isDisabled`       | `boolean`              | `false`       | Dims it, drops the handle's shadow, stops the drag      |
