# WheelPicker

A column of options you turn, and the one at the middle is the answer.

## Import

```tsx
import { WheelPicker } from '@xaui/native/wheel-picker'
```

## Anatomy

```tsx
<WheelPicker>
  <WheelPicker.Column value={hour} onValueChange={setHour}>
    <WheelPicker.Item value="09">09</WheelPicker.Item>
  </WheelPicker.Column>
</WheelPicker>
```

- **`WheelPicker`** — the wheel. It resolves the recipe, computes the geometry once and
  draws the band. It has no value of its own.
- **`WheelPicker.Column`** — one turning column, and **the thing that has a value**.
- **`WheelPicker.Item`** — one row. A `Text`, not a control.

## The column has the value, not the wheel

A time is two columns and a date is three, so a wheel with a single value would be a wheel
that can only ever be one of them. The `WheelDatePicker`, `WheelTimePicker` and
`WheelDateTimePicker` of P5.25 are all **this component with a different set of columns**
and the arithmetic to fill them — which is why it is here first, and why the roadmap calls
it "the spinning column the three below share".

```tsx
<WheelPicker>
  <WheelPicker.Column
    value={hour}
    onValueChange={setHour}
    accessibilityLabel="Heures"
  >
    {HOURS.map(h => (
      <WheelPicker.Item key={h} value={h}>
        {h}
      </WheelPicker.Item>
    ))}
  </WheelPicker.Column>
  <WheelPicker.Column
    value={minute}
    onValueChange={setMinute}
    accessibilityLabel="Minutes"
  >
    {MINUTES.map(m => (
      <WheelPicker.Item key={m} value={m}>
        {m}
      </WheelPicker.Item>
    ))}
  </WheelPicker.Column>
</WheelPicker>
```

## The scroll is the control

There is no press to select. The row at the middle **is** the choice, so a column snaps to a
row and reports whichever one it stopped at — which is what makes this a wheel rather than a
short list, and why the rows are `Text` nodes rather than pressables. A row you could tap
would be a second way to choose that the band does not describe.

**It reports at rest, never while turning.** One flick passes nine rows, and every one of
them is a value some caller would have written to a form. `onScrollEndDrag` covers a slow
drag that stops without momentum and `onMomentumScrollEnd` covers the flick; both are
needed, and neither fires for the other.

Coming back to rest on the row you started from fires nothing at all.

## The band is the root's

One shape laid across every column, rather than one per column: two columns at different
widths would show the seam between their two bands. It is `pointerEvents: 'none'`, so it
marks the middle without taking the touch that turns the wheel under it.

It is written by the root rather than by the caller, unlike the `Tabs`'s indicator — that
one is a choice about a decoration, and this is where the middle _is_.

## The rows fade and lean away

Not decoration: it is the whole of what says this is a drum with more of it out of sight
rather than a list that happens to have stopped. The row at the middle is upright, full
strength and in the band's colour; two rows out it is at a quarter opacity, 82% of its size
and turned 55°.

The turn is read from the column's scroll offset **on the UI thread**, through a shared
value. A position crossing the bridge every frame would animate at the rate React
re-renders rather than at the rate the finger moves — which on a fast flick is the
difference between a drum and a slideshow.

## `visibleCount` is forced odd

```tsx
<WheelPicker visibleCount={7}>…</WheelPicker>
```

The whole control is built on there being a **middle row**. An even count has two rows
equally near the centre, and the band would sit over the seam between them. A count is
rounded **up** to the next odd number, because a caller who asked for four wanted more than
three, not less.

It is a raw number rather than a token, like the `ProgressCircle`'s `radius`, so it lives
outside the style cache: the wheel's height is `visibleCount` rows and is applied after the
recipe rather than inside it.

## There is no `loop`

An endless drum is not a scroll view with a flag on it — it is a list with no end, faked by
rewriting the data around the finger and jumping the offset back whenever it drifts too far.
That trick belongs to the caller's data, where the caller knows how many months there are;
here it would be a component quietly renumbering its own children.

## Sizes

| `size` | Row | Type  |
| ------ | --- | ----- |
| `sm`   | 32  | 14/20 |
| `md`   | 36  | 16/24 |
| `lg`   | 44  | 18/28 |

**`size` is the row's height, never the wheel's width.** A wheel spans its parent and its
columns divide that between them, which is RN's own behaviour — a caller who wants a narrow
one writes a width on the wheel or a `flex` on a column.

`md` is iOS's picker row measured: 36 points, which is what puts five of them in the 180 the
platform's own wheel is.

The row heights are off the spacing grid on purpose, like the `Slider`'s rail: how tall a
row has to be before a list of them reads as something you can aim at has nothing to do with
the gaps between things.

## Variants and colour

| `variant`   | Band          | The row on it          |
| ----------- | ------------- | ---------------------- |
| `primary`   | `accentSoft`  | `accentSoftForeground` |
| `secondary` | `default`     | `defaultForeground`    |
| `tertiary`  | two hairlines | `foreground`           |
| `ghost`     | —             | `foreground`           |

Four emphasis levels and **no intent**: a wheel reports a choice, and a choice is neither a
success nor a danger. What the variant names is the band.

`tertiary` is two hairlines rather than a box, because the band marks a row in a column of
rows and a full border round it reads as a field the wheel is inside. `ghost` names neither
a fill nor a border, and that is a design rather than an omission — the rows already say
which one is chosen, and on a busy screen the band is the part that reads as chrome.

`color` is a raw value (R7) and lands on the band. `secondary` names `defaultForeground`
rather than `foreground` for exactly that: `resolveTint` reads the role off the token's own
name, a bare `foreground` is a neutral and maps to the tint **itself**, and a band painted
the same colour as the row sitting on it is a row you cannot read.

## Props

### `WheelPicker`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop           | Type                   | Default       | Notes                             |
| -------------- | ---------------------- | ------------- | --------------------------------- |
| `variant`      | `WheelPickerVariant`   | `'secondary'` | What the band is                  |
| `size`         | `'sm' \| 'md' \| 'lg'` | `'md'`        | The row's height and its type     |
| `radius`       | `RadiusKey`            | `'lg'`        | The band's corner                 |
| `color`        | `string`               | —             | A hex tint, on the band           |
| `visibleCount` | `number`               | `5`           | Rows on screen. Forced odd, min 3 |
| `isDisabled`   | `boolean`              | `false`       | Every column, and none opts out   |
| `asChild`      | `boolean`              | `false`       | Merge into the single child       |

### `WheelPicker.Column`

Everything `ScrollView` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop            | Type                      | Default | Notes                      |
| --------------- | ------------------------- | ------- | -------------------------- |
| `value`         | `string`                  | —       | Controlled                 |
| `defaultValue`  | `string`                  | first   | Uncontrolled starting row  |
| `onValueChange` | `(value: string) => void` | —       | At rest only               |
| `isDisabled`    | `boolean`                 | `false` | Stops this column's scroll |

### `WheelPicker.Item`

`value`, its children, and the `TextStyle` keys as props (R14).

## Extending it

`useWheelPicker()` carries the resolved styles and the geometry — the row height above all,
since the snap interval, the padding and the rest position are all computed from it.
`useWheelPickerColumn()` carries the live offset, the resting index and each row's position.
Both are exported (R10), and both throw by name outside their parent.

## Accessibility

- **The column carries the label**, not the rows: `accessibilityLabel="Heures"` on a column
  is what a screen reader announces, and every row announcing itself would announce the
  whole drum.
- Rows other than the chosen one are hidden from the accessibility tree for the same reason.
- `isDisabled` stops the scroll rather than dimming a control that still moves.
