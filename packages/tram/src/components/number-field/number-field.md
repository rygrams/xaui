# NumberField

A number, typed, with the two ends of its range and a pair of keys that walk it — the Tram
`TextField`'s box drawn around the field, with a square key at each end and the value
centred between them in tabular figures.

It is a `TextField`. `NumberField.Label`, `.Description` and `.Error` are the Tram
`TextField`'s own slots, re-exported; parsing, clamping and stepping are Native's.

## Import

```tsx
import { NumberField } from '@xaui/tram/number-field'
```

## Anatomy

```tsx
<NumberField>
  <NumberField.Label />
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Field />
    <NumberField.Increment />
  </NumberField.Group>
  <NumberField.Description />
  <NumberField.Error />
</NumberField>
```

- **`NumberField`** — the root, the Tram `TextField`'s, plus the value, the bounds and the
  step.
- **`NumberField.Label`** — the label above the box.
- **`NumberField.Group`** — the box: one line around the field and its two keys.
- **`NumberField.Field`** — the input, the value centred in tabular figures.
- **`NumberField.Decrement`** / **`NumberField.Increment`** — the square keys at the start
  and the end, each ruled off from the value in `muted`. With no children they draw a minus
  or a plus in bars of 2; pass an `Icon` to replace the mark.
- **`NumberField.Description`** — a line of help under the box.
- **`NumberField.Error`** — the error, drawn with `isInvalid`. Mounting it stays yours.

## Usage

### Basic

```tsx
<NumberField min={1} max={99} defaultValue={1} onValueChange={setQuantity}>
  <NumberField.Label>quantity</NumberField.Label>
  <NumberField.Group>
    <NumberField.Decrement accessibilityLabel="One fewer" />
    <NumberField.Field />
    <NumberField.Increment accessibilityLabel="One more" />
  </NumberField.Group>
</NumberField>
```

### Controlled

```tsx
<NumberField value={copies} onValueChange={setCopies} min={1} max={5}>
  {/* … */}
</NumberField>
```

The value is a number, or `null` while the box holds no number yet — never `NaN`.

### Format and locale

```tsx
<NumberField
  locale="fr-FR"
  formatOptions={{ style: 'currency', currency: 'EUR' }}
  defaultValue={34}
  min={0}
  step={0.5}
>
  {/* … */}
</NumberField>
```

Out of the field, the value is written with `Intl.NumberFormat` and `formatOptions`; with
the caret in it, the same number is written plainly so it can be edited. `locale` (`en-US`
by default) decides which characters group and separate the number, in and out.

### Bounds and step

`min` and `max` land when the reader leaves the field and on every press of a key — not while
they type, so a reader on their way to `15` with `min={10}` can type the `1`. `step` is how
far one press moves the value (1 by default); from an empty field, a step starts at zero. A
key with nowhere left to go turns grey and stops taking presses.

### Keyboard

A fractional `step`, or `formatOptions` asking for decimals, opens the decimal pad; anything
else opens the number pad. `keyboardType` on `NumberField.Field` overrides it — for a field
that has to take a minus sign.

## Sizes

```tsx
<NumberField size="sm">…</NumberField>
<NumberField size="md">…</NumberField>
<NumberField size="lg">…</NumberField>
```

`size` sets the box's height — 40, 48 or 56 — and the keys' square, 36, 44 or 52 across.

## Colour

The line turns to the theme's accent, read as ink, once the field has the focus. `accent`
picks one of the twenty named Metro accents; `color` takes a raw tint and wins when both are
set. `isInvalid` draws the line in the danger colour and outranks both.

## Accessibility

- Each key is a `button`, announced as disabled when it has nowhere left to go. It needs an
  `accessibilityLabel` — a plus is not text — and warns in development without one.
- A key smaller than 48 points reaches past its cell for the touch.
- A press shrinks the key, changes no colour, and every step is felt as a `selection`.
- The field is described by `NumberField.Error` when it is shown; `isRequired` tells a
  screen reader the field has to be filled.

## Differences from Native

- **`NumberField.Group`** is added: Tram has no `FieldGroup`, so the box around the field
  and its keys is the number field's own.
- **No `variant`** and **no `labelPlacement`**, as on the Tram `TextField`.
- **`accent`** and **`isRequired`** are added — the Tram `TextField`'s.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **A spent key** turns grey and out; Native's goes flat.
