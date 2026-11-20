# MaskField

A value typed into a shape — a date, a time, a card number, or a pattern of your own — in
the Tram `TextField`'s box: the ground inside a line, with what is left of the shape waiting
in grey behind the typed text.

It is a `TextField`. `MaskField.Label`, `.Description` and `.Error` are the Tram
`TextField`'s own slots, re-exported; only `MaskField.Field` differs, by masking what is
typed into it. The mask itself is Native's, so both packages accept, clamp and put back the
same characters.

## Import

```tsx
import { MaskField } from '@xaui/tram/mask-field'
```

## Anatomy

```tsx
<MaskField>
  <MaskField.Label />
  <MaskField.Field />
  <MaskField.Description />
  <MaskField.Error />
</MaskField>
```

- **`MaskField`** — the root, the Tram `TextField`'s. It holds the masked text and decides
  the keyboard and the placeholder once.
- **`MaskField.Label`** — the label above the box. A touch on it gives the field the focus.
- **`MaskField.Field`** — the box, masked. It takes the number pad for a digit shape and
  the default keyboard for one with letters, and stops at the shape's length.
- **`MaskField.Description`** — a line of help under the box.
- **`MaskField.Error`** — the error, drawn with `isInvalid`. Mounting it stays yours.

## Usage

### Presets

```tsx
<MaskField mask="credit-card" onValueChange={setCard}>
  <MaskField.Label>card number</MaskField.Label>
  <MaskField.Field />
</MaskField>
```

`mask` takes one of four presets: `date`, `time` (24-hour), `datetime` and `credit-card`.
A date part is clamped as it is typed — the 31st of February becomes the 28th.

### A pattern

```tsx
<MaskField mask="AA-###-AA">
  <MaskField.Label>plate</MaskField.Label>
  <MaskField.Field autoCapitalize="characters" />
</MaskField>
```

Any other string is a pattern: `#` a digit, `A` a letter, `*` either, and every other
character a literal, put back as the parts fill. A pattern does not clamp.

### Dates and locales

```tsx
<MaskField
  mask="date"
  locale="fr-FR"
  segmentLabels={{ day: 'JJ', month: 'MM', year: 'AAAA' }}
  convert={text => parseMaskedDate(text, 'fr-FR')}
  onValueChange={(text, value) => setDay(value as Date | null)}
>
  <MaskField.Label>delivery date</MaskField.Label>
  <MaskField.Field />
</MaskField>
```

The order and the separator of the date parts are read from `locale` (`en-US` by default).
`order` sets the order when it is a decision — an ISO field is `YMD` — and `separator` and
`segmentLabels` override the rest. `parseMaskedDate` and `parseMaskedTime` come from
`@xaui/native/mask-field`.

### The value

`value`, `defaultValue` and `onValueChange` work on the masked text; a raw string given to
`value` or `defaultValue` is masked on the way in. `convert` turns the text into a value of
your own — a `Date`, `{ hours, minutes }` — and returns `null` while the text is not one
yet; `onValueChange` receives it as its second argument.

### The rest of the shape

```tsx
<MaskField mask="date" defaultValue="0412" showMask={false}>
  <MaskField.Label>date</MaskField.Label>
  <MaskField.Field />
</MaskField>
```

With `showMask` (true by default), what is left of the shape stays in the placeholder's grey
behind the typed text — `04/12/` then a grey `YYYY`. It steps aside on its own when it
cannot sit exactly under the text: labels not as wide as their parts, or text not aligned to
the start. With `showMask={false}` the shape is only the placeholder, gone at the first key.

## Sizes

```tsx
<MaskField size="sm" mask="time">…</MaskField>
<MaskField size="md" mask="time">…</MaskField>
<MaskField size="lg" mask="time">…</MaskField>
```

`size` is the box's height — 40, 48 or 56 — with its padding and type. Never its width.

## Colour

The line turns to the theme's accent, read as ink, once the field has the focus. `accent`
picks one of the twenty named Metro accents; `color` takes a raw tint and wins when both are
set. `isInvalid` draws the line in the danger colour and outranks both.

## Accessibility

- The field is described by `MaskField.Error` when it is shown.
- `isRequired` tells a screen reader the field has to be filled; it draws nothing.
- `isDisabled` greys the line, the text and the label, and makes the field uneditable.
- The grey rest of the shape is hidden from screen readers and takes no touches.

## Differences from Native

- **No `variant`** and **no `labelPlacement`**: the Metro box has one drawing, and its label
  stands above it.
- **`accent`** and **`isRequired`** are added — the Tram `TextField`'s.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`showMask`** is added, true by default. Native shows the shape only while the box is
  empty.
