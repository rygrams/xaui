# Slider

A value chosen along a line.

## Import

```tsx
import { Slider } from '@xaui/native/slider'
```

`react-native-gesture-handler` is an **optional** peer of this package, and this is the
component that needs it. It is imported here and nowhere else, so only an app that reaches
for `@xaui/native/slider` pays for it.

## Anatomy

```tsx
<Slider>
  <Slider.Output />
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb />
  </Slider.Track>
</Slider>
```

- **`Slider`** — the value, the range, and the styles the slots read.
- **`Slider.Output`** — the value in words. Optional.
- **`Slider.Track`** — the line, and the only node that knows how long it is.
- **`Slider.Fill`** — the part behind the thumb.
- **`Slider.Thumb`** — what the finger holds.

## Usage

### Basic

```tsx
<Slider defaultValue={40} onValueCommit={save}>
  <Slider.Output />
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb />
  </Slider.Track>
</Slider>
```

### Two callbacks, and the difference matters

`onValueChange` fires on every step the thumb crosses, **including mid-drag**. It is what a
live preview reads.

`onValueCommit` fires **once**, when the finger lifts. It is where a network call belongs,
because the first one can fire fifty times in a second.

### Steps

```tsx
<Slider min={5} max={95} step={10} />
```

Eleven stops at 5, 15, 25 … The snap counts steps **from the minimum** rather than rounding
the value, so that range stops where it says it does and not at 10, 20, 30. `step={0}` is
continuous.

### Formatting the output

```tsx
<Slider.Output>{value => `${value} %`}</Slider.Output>
```

`children` may be a function of the value. A `format` prop would have been the same thing
with less room in it.

### Style as props

```tsx
<Slider.Track height={8} />
<Slider.Thumb width={32} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `Slider`

| prop            | type                      | default | description                        |
| --------------- | ------------------------- | ------- | ---------------------------------- |
| `size`          | `'sm' \| 'md' \| 'lg'`    | `md`    | Track thickness, thumb width, type |
| `radius`        | `RadiusKey`               | —       | Overrides every corner             |
| `color`         | `string`                  | —       | The tint (R7) — a raw value        |
| `value`         | `number`                  | —       | Controlled                         |
| `defaultValue`  | `number`                  | `0`     | Uncontrolled                       |
| `onValueChange` | `(value: number) => void` | —       | Every step, mid-drag included      |
| `onValueCommit` | `(value: number) => void` | —       | Once, when the finger lifts        |
| `min`           | `number`                  | `0`     |                                    |
| `max`           | `number`                  | `100`   |                                    |
| `step`          | `number`                  | `1`     | `0` is continuous                  |
| `isDisabled`    | `boolean`                 | `false` |                                    |

No `variant`, and no `xs`. A slider reports a quantity rather than an intent — a `danger`
volume control would be colouring a number — and a track four points tall is a line, not a
control.

### `Slider.Thumb`

`accessibilityValueText` turns the raw number into what a screen reader reads.

## How it is put together

**The travel is inset by half a thumb at each end.** Otherwise the thumb hangs over the
track's ends at the minimum and the maximum, and the fill runs out from under it. The fill
runs to the thumb's **centre** rather than to the raw proportion, for the same reason.

**A press anywhere on the track moves the thumb there.** It is the half of a slider people
forget: dragging a narrow thumb is a fine gesture on a mouse and a poor one on a finger.

**The thumb grows 15% under the press rather than moving.** The finger is already covering
it, so the scale is what you see in the gap around it — and it is the only confirmation a
slider can give that the drag has started. Stiff and well damped: a confirmation should
arrive, not wobble.

**The value crosses to the JS thread and the scale does not.** The pan computes the new
position on the UI thread and hands the value back over `runOnJS`, which is the one hop
that has to happen — the value is React state. The scale stays where it is.

## Not here yet

**A range slider**, with two thumbs. The context already carries what a second thumb would
need, and `useSlider` is exported for anyone who wants to write one — but two thumbs is two
values, a different type for `value`, and rules about which one gives way. Worth its own
change.

**A vertical slider.** The same arithmetic on the other axis, but also a different gesture
and a different layout.

## Accessibility

The thumb is `adjustable`, carrying `min`, `max` and `now`, and it answers the platform's
increment and decrement actions by one `step` — without that the platform guesses one
percent of the range, which on a slider of five stops moves nothing.

## Migration from `@xaui/native-legacy`

| Legacy                     | v1                                 |
| -------------------------- | ---------------------------------- |
| `value` / `onValueChange`  | unchanged                          |
| `onSlidingComplete`        | `onValueCommit`                    |
| `minimumValue`             | `min`                              |
| `maximumValue`             | `max`                              |
| `themeColor="primary"`     | `color={theme.colors.accent}`      |
| `customAppearance={{ … }}` | `style` on the slot that key named |
