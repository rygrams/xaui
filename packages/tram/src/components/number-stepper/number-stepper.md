# NumberStepper

A quantity and the two presses that move it, drawn the Metro way: two square keys in the
`Button`'s drawing, and the value between them in tabular figures, on the ground.

Nothing is typed, so there is no parse and no late clamp: a value that can only be pressed
into existence is inside its range at every moment. Stepping, clamping and formatting are
Native's.

## Import

```tsx
import { NumberStepper } from '@xaui/tram/number-stepper'
```

## Anatomy

```tsx
<NumberStepper>
  <NumberStepper.Track />
  <NumberStepper.Decrement />
  <NumberStepper.Value />
  <NumberStepper.Increment />
</NumberStepper>
```

- **`NumberStepper`** — the root, a row holding the value, the bounds and the step.
- **`NumberStepper.Track`** — kept for Native's markup. It draws nothing unless you style it,
  takes no touches and is hidden from screen readers.
- **`NumberStepper.Decrement`** / **`NumberStepper.Increment`** — the two square keys. With
  no children they draw a minus or a plus in bars of 2; pass an `Icon` to replace the mark.
- **`NumberStepper.Value`** — the value formatted, or an em dash while there is none. A
  function child is given the number to write it your own way.

## Usage

### Basic

```tsx
<NumberStepper min={0} max={5} defaultValue={1} onValueChange={setQuantity}>
  <NumberStepper.Decrement accessibilityLabel="One fewer" />
  <NumberStepper.Value />
  <NumberStepper.Increment accessibilityLabel="One more" />
</NumberStepper>
```

A key with nowhere left to go is drawn as a disabled key and stops taking presses.

### Writing the value

```tsx
<NumberStepper.Value>
  {value => `${value ?? 0} ${value === 1 ? 'guest' : 'guests'}`}
</NumberStepper.Value>
```

`formatOptions` (`Intl.NumberFormat`'s options) and `locale` (`en-US` by default) write the
value when `Value` has no children.

### A bin at the floor

```tsx
<NumberStepper.Decrement
  accessibilityLabel={quantity === 1 ? 'Remove from basket' : 'One fewer'}
  onPress={quantity === 1 ? remove : undefined}
>
  {quantity === 1 ? <Icon as={TrashIcon} /> : undefined}
</NumberStepper.Decrement>
```

A key's own `onPress` replaces the step rather than running beside it.

## Variants

The `Button`'s four drawings, on the keys:

| Variant     | Drawn as                             |
| ----------- | ------------------------------------ |
| `outline`   | a line in the accent's ink (default) |
| `contained` | filled with the accent               |
| `flat`      | filled with its soft slice           |
| `text`      | the bare mark                        |

```tsx
<NumberStepper variant="contained">…</NumberStepper>
```

## Sizes

```tsx
<NumberStepper size="sm">…</NumberStepper>
<NumberStepper size="md">…</NumberStepper>
<NumberStepper size="lg">…</NumberStepper>
```

`size` sets the keys' side — 32, 40 or 48 — the gaps, and the value's type (`body`,
`subtitle` or `title`). Never the width. `radius` overrides the keys' corner, within 2.

## Colour

The keys take the theme's accent. `accent` picks another one of the twenty named Metro
accents; `color` takes a raw tint and wins when both are set. The value keeps the page's ink.

## Accessibility

- Each key is a `button`, announced as disabled when it has nowhere left to go. It needs an
  `accessibilityLabel` — a plus is not text — and warns in development without one.
- A key smaller than 48 points reaches past its box for the touch.
- The root row has no role: the controls are the two keys.
- A key tilts toward the finger and leaves its colours alone; every move is felt as a
  `selection`.

## Differences from Native

- **`variant`** is the `Button`'s four drawings — `outline` by default, `contained`, `flat`,
  `text` — for Native's `primary`, `secondary`, `tertiary` and `ghost`.
- **No pill**: `Track` is kept for Native's markup and draws nothing unless styled.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`accent`** is added.
- **A `selection` haptic** is felt on every move.
