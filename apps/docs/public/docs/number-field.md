# NumberField

A number, typed — with the two ends of its range and a pair of buttons that walk it.

## Import

```tsx
import { NumberField } from '@xaui/native/number-field'
import { FieldGroup } from '@xaui/native/field-group'
```

## Usage

```tsx
<NumberField min={1} max={99} defaultValue={1} onValueChange={setQuantity}>
  <NumberField.Label>Quantité</NumberField.Label>
  <FieldGroup>
    <NumberField.Decrement accessibilityLabel="Retirer un article" />
    <NumberField.Field />
    <NumberField.Increment accessibilityLabel="Ajouter un article" />
  </FieldGroup>
</NumberField>
```

## It is a `TextField`

The root is the `TextField`'s root, unchanged: the same recipe, the same four variants, the
same `size`, `radius`, `color`, `labelPlacement`, `isInvalid` and `isDisabled`.
`NumberField.Label`, `.Description` and `.Error` **are** the `TextField`'s slots — the same
components, not wrappers. Only the field differs, by reading a number out of what is typed
into it. The [`MaskField`](../mask-field/mask-field.md)'s arrangement exactly.

## The value is a number, and the box is a string

Two representations, and the caret is what swaps them.

| where the caret is | what the box holds                                 |
| ------------------ | -------------------------------------------------- |
| outside            | the value written by `Intl`, `formatOptions`'s way |
| inside             | the same number written plainly, no grouping       |

**Out of the field**, `formatOptions` is `Intl.NumberFormat`'s own options, unchanged — a
currency, a unit, a fixed number of decimals cost nothing here.

**Into it**, everything that is not a digit, a sign or the decimal mark is **dropped rather
than refused**. The value the caret lands in is grouped, and rejecting its separators would
make the first keystroke on an existing value clear the box. A full stop passes as the
decimal mark wherever the locale is not using it to group, so `1.5` reads as one and a half
in `fr-FR` and `1.234` still reads as a thousand-odd in `de-DE`.

**On the way in the value is rewritten plainly**, so nobody has to type a euro sign back in.

`null`, never `NaN`: "not a number yet" is the state a half-typed field is in for as long
as it takes to type a minus sign, and `NaN` is a value that propagates instead of a state a
caller can test.

## The bounds land when the reader leaves, not while they type

`min={10}`, and a reader on their way to `15` types a `1` first. Clamping that would take
the keyboard away from them.

So until the field is left, `onValueChange` reports what is actually in the box. The clamp
falls on blur, and on every press of a stepper.

## The steppers

They are `FieldGroup` decorators, like `TimeField.Period` — that is the thing that lays a
control over a field and measures it, so the box stays the `TextInput` itself and no
wrapper borrows its border, its fill and its radius.

**`Decrement` takes the leading edge and `Increment` the trailing one.** The value sits
between them, which is the only arrangement in which the two read as one control rather
than as two marks that happen to be nearby. `start` and `end`, never `left` and `right`
(R13).

**A button goes flat when the value has nowhere left to go**, and stops taking presses
there. That is asked of the **result** rather than of the bound: a value half a step short
of the ceiling can still reach it, and a button dead at that point strands the reader.

With no children each draws its own mark — one bar, or two a quarter turn apart — so the
field works in a project that has installed no icon set. Pass an `<Icon>` to replace it.

## From an empty field, a step starts at zero

Which is what puts the first press on `min` when the range starts above it: `min={5}` and a
step of one gives 5, not 6.

## The keyboard is a guess, and a guess you can override

A fractional `step`, or a `formatOptions` that asks for decimals, opens the decimal pad;
anything else opens the number pad. Unlike the `MaskField`'s, `NumberField.Field` does
**not** claim `keyboardType` — a field that has to take a minus sign needs a keyboard with
one on it, and that is the caller's call.

## Related

- [`NumberStepper`](../number-stepper/number-stepper.md) — the same pair without a field
  to type into.
- [`Slider`](../slider/slider.md) — a quantity chosen on a track.
- [`TextField`](../text-field/text-field.md) — the root, the label, the hint and the error.
