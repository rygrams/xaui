# DateRangeField

A period, typed — two dates in one box.

## Import

```tsx
import { DateRangeField } from '@xaui/native/date-range-field'
```

## Usage

```tsx
<DateRangeField locale="fr-FR" onValueChange={setStay}>
  <DateRangeField.Label>Séjour</DateRangeField.Label>
  <DateRangeField.Field />
  <DateRangeField.Description>Arrivée et départ.</DateRangeField.Description>
</DateRangeField>
```

## One box, and one mask twice

A period is one value, so it is one box — the `DateTimeField`'s argument.

The mask is `maskDate` **twice**, over one stream of digits: the first eight are the start
and the rest are the end. Every rule that mask already has is kept rather than copied — the
month capped at 12, the day capped by its month, nothing raised under the reader — and the
dash appears the moment the ninth digit does, which is what tells a reader they have left the
first date and are typing the second.

```
0407              → 04/07
04071995          → 04/07/1995
040719951         → 04/07/1995 – 1
0407199511071995  → 04/07/1995 – 11/07/1995
```

**An en dash**, not a hyphen: a hyphen is already the date separator in half the locales this
field serves, and `1995-07-04 - 1995-07-11` is a line a reader has to parse rather than read.

## The two ends are reported independently

```ts
type DateRange = { start: Date | null; end: Date | null }
```

A reader who has finished the start and is halfway through the end **has a start**, and a
caller filtering a list can use it straight away. A single `null` for the pair would throw
that away and make the field feel inert until its last digit.

Each end is `null` until it is a whole and real date, exactly as a `DateField`'s value is.

## Whether the end is after the start is not decided here

That is a rule about the _range_ rather than about what was typed, and it differs by feature:
some periods may be a single day, some may not, some have a maximum length. `isInvalid` with
a `DateRangeField.Error` is where a caller says so.

```tsx
const backwards =
  range.start !== null && range.end !== null && range.end < range.start

<DateRangeField value={range} onValueChange={setRange} isInvalid={backwards}>
  <DateRangeField.Label>Période</DateRangeField.Label>
  <DateRangeField.Field />
  {backwards ? <DateRangeField.Error>La fin est avant le début.</DateRangeField.Error> : null}
</DateRangeField>
```

## It is a `TextField`

The root is the `TextField`'s root, and `Label`, `Description` and `Error` **are** its slots.
Only the field differs. `order`, `separator` and `segmentLabels` behave exactly as on the
`DateField`.

Controlled the same way: `value` overrides the text only when the two disagree about which
days they name, so a reader's keystrokes survive a re-render.

## See also

- **`DateField`** — one date, with a calendar beside it.
- **`DateRangePicker`** — a period _chosen_ rather than typed.
