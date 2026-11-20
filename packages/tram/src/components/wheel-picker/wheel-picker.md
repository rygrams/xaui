# WheelPicker

A column of options you turn, the one at the middle being the answer, drawn as the Metro
date picker's wheels: a pile of squares, the current one a flat fill of the accent, its
neighbours the ground inside a grey line.

There is no band: a square takes the fill as it nears the middle, with no threshold. At
rest only the current squares are left; the neighbours come back at the first touch.

## Import

```tsx
import { WheelPicker } from '@xaui/tram/wheel-picker'
```

## Anatomy

```tsx
<WheelPicker>
  <WheelPicker.Column>
    <WheelPicker.Item />
  </WheelPicker.Column>
</WheelPicker>
```

- **`WheelPicker`** — the root: the wheel. It resolves the recipe, the colours and the
  geometry every column is measured by.
- **`WheelPicker.Column`** — one turning column, and the value it has come to rest on. A
  time is two columns and a date three, so the column is what has a value.
- **`WheelPicker.Item`** — one square, its text at the bottom, at the start. `value` is
  what the column reports, not the text. `ref`, `style` and the style props are the
  square's.

## Usage

### Basic

```tsx
<WheelPicker>
  <WheelPicker.Column value={hour} onValueChange={setHour} accessibilityLabel="hour">
    {HOURS.map(h => (
      <WheelPicker.Item key={h} value={h}>
        {h}
      </WheelPicker.Item>
    ))}
  </WheelPicker.Column>
  <WheelPicker.Column
    value={minute}
    onValueChange={setMinute}
    accessibilityLabel="minute"
  >
    …
  </WheelPicker.Column>
</WheelPicker>
```

Drag a column, throw it, or touch a neighbour to bring it to the middle. A throw keeps its
momentum and stops on a whole square; a touch stops it mid-throw. **`onValueChange` fires
at rest, never while turning.**

### Looping

```tsx
<WheelPicker.Column defaultValue="00" isLooping>
  …
</WheelPicker.Column>
```

`isLooping` puts the first square after the last. It needs one square more than are
visible; with fewer the column has ends.

### Two lines

A plain-text square is one line, shrunk to fit. A nested `Text` makes a second line in the
same colour.

```tsx
<WheelPicker.Item value="12">
  12{'\n'}
  <Typography variant="caption">dec</Typography>
</WheelPicker.Item>
```

### Visible squares

`visibleCount` is how many squares show at once — 5 by default, forced odd, at least
three. `isAwake` keeps the neighbours on screen at rest. `wheelGeometry(size,
visibleCount)` returns the `side`, `step`, `visibleCount` and `height` a wheel takes.

## Variants

| Variant     | Current square                    | Neighbours                  |
| ----------- | --------------------------------- | --------------------------- |
| `contained` | a flat fill of the accent         | the ground in a grey line   |
| `light`     | no square: its text in the accent | no square: their text alone |

```tsx
<WheelPicker variant="light">…</WheelPicker>
```

## Sizes

```tsx
<WheelPicker size="sm">…</WheelPicker>
<WheelPicker size="md">…</WheelPicker>
<WheelPicker size="lg">…</WheelPicker>
```

`size` is the square's side — 64, 84, 104 — and the type in it. Squares are 8 apart.

## Colour

`accent` picks one of the twenty named accents: the fill of the current square, or under
`light` its text, read as ink on the ground. `color` takes a raw `#RRGGBB` for the same
place, wins when both are set, and is never corrected.

## Accessibility

- Each column is one `adjustable` element (`spinbutton` on the web) with a value, reading
  the current square and stepping by one through `increment` and `decrement`. Give it an
  `accessibilityLabel`. The squares themselves are hidden from screen readers.
- Each square passed on the way is felt through `TramProvider`'s `onHaptic`.
- With motion reduced a throw has no momentum: the column goes to the nearest square.
  Under `disable-all` everything is placed.
- `isDisabled` on the root greys every column and stops the wheel; on a column it greys
  that column only. Disabled is grey, not dimmed.

## Differences from Native

- **No `radius` and no band**: `variant` names how the current square is drawn
  (`contained` or `light`), not the shape behind it.
- **`accent`** is added.
- **`isAwake`** is added on the root, and **`isLooping`** on `Column` takes one square
  more than are visible.
- **`Column`** is a `View` moved by `react-native-gesture-handler` (an optional peer), an
  `adjustable` with a value; Native's is a `ScrollView`, with its props and its ref.
- **`Item`** is a pressable square with its text inside; Native's is the `Text` alone.
- **A disabled column** is grey, not dimmed.
- **`wheelGeometry`** returns `side`, `step`, `visibleCount` and `height`.
