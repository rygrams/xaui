# NumberPad

The keypad a PIN, a code or an amount is typed on, drawn as the Metro dialer: three columns
of digits alone on the ground — light, centred, in the page's ink — with no fill, no line
and no corner around them.

The digits `1` to `9`, the `0` and the backspace are drawn by the root. The one cell you
compose is the free corner of the bottom row, beside the `0` and opposite the backspace. The
pad draws no display: what the value looks like is the screen's.

## Import

```tsx
import { NumberPad } from '@xaui/tram/number-pad'
```

## Anatomy

```tsx
<NumberPad>
  <NumberPad.Action>
    <NumberPad.Icon />
    <NumberPad.Label />
  </NumberPad.Action>
</NumberPad>
```

- **`NumberPad`** — the root. It draws the grid of digits and the backspace, holds the
  value and applies the edits.
- **`NumberPad.Key`** — a key that inserts its `value`, and shows it when nothing is
  composed inside it. Placed in the free corner, it adds a key of your own — a decimal
  comma, a `00`.
- **`NumberPad.Backspace`** — deletes the last character; a long press empties the value.
  The root draws it for you.
- **`NumberPad.Action`** — a cell that runs its own `onPress`, for the free corner.
- **`NumberPad.Label`** — the text in a cell. Its type follows the cell it is in.
- **`NumberPad.Icon`** — an icon in a cell, in the cell's ink.

Left out, the free corner is an empty cell that keeps the `0` in the middle column.

## Usage

### A code

```tsx
<NumberPad maxLength={4} onChangeText={setCode} onComplete={unlock} />
```

`onComplete` fires once the value reaches `maxLength`. A press past it changes nothing at
all, so `onChangeText` does not fire and a full code cannot be completed twice.

### An amount

```tsx
<Typography variant="section">{`${amount || '0'} €`}</Typography>
<NumberPad value={amount} onChangeText={setAmount}>
  <NumberPad.Key value="," />
</NumberPad>
```

Without `maxLength` the value is unbounded.

### An action in the corner

```tsx
<NumberPad value={code} onChangeText={setCode} maxLength={4}>
  <NumberPad.Action onPress={() => setCode('')} accessibilityLabel="Clear all">
    <NumberPad.Label>clear</NumberPad.Label>
  </NumberPad.Action>
</NumberPad>
```

### Disabled

`isDisabled` on the root greys every key and stops them all. `isDisabled` on one cell
overrides the pad's, so a single key can be out while the rest are live.

### The edits

`appendPadKey`, `removePadKey` and `isPadComplete` — the same edits the pad applies — are
exported from `@xaui/native/number-pad`, for a display or a pad of your own.

## Sizes

```tsx
<NumberPad size="sm" />
<NumberPad size="md" />
<NumberPad size="lg" />
```

`size` sets the keys' height — 48, 56 or 64 — the gaps, and the digits' type (`title`,
`section` or `pivot`). Never a width.

## Accessibility

- Every cell is a `button`, announced as disabled when it is out. A digit key is labelled by
  its value, the backspace "Backspace".
- A `NumberPad.Action` holding an icon or a word needs an `accessibilityLabel` that says what
  it does.
- A press shrinks the key a little and springs back, felt as a `press`; it changes no colour.

## Differences from Native

- **No `variant`, no `radius`, no `color`**: the keys have no box to fill, round or tint.
- **Disabled** is grey, not dimmed.
- **The press** shrinks the key and changes no colour.
