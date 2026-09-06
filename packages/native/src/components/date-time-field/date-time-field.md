# DateTimeField

A moment, typed — a date and a time in one box.

## Import

```tsx
import { DateTimeField } from '@xaui/native/date-time-field'
```

## Usage

```tsx
<DateTimeField locale="fr-FR" onValueChange={setStartsAt}>
  <DateTimeField.Label>Début de l’événement</DateTimeField.Label>
  <DateTimeField.Field />
</DateTimeField>
```

## One box, not two fields side by side

A moment is one value. Two boxes make a reader tab between them, decide which one an error
belongs to, and hold half a moment while they do.

## Two masks in sequence, over one stream of digits

The first eight digits are the date and the rest are the time, so `maskDate` and `maskTime`
keep every rule they already have — the month capped at 12, the day capped by its month, the
minutes at 59, nothing raised under the reader — and this adds one thing to them: where the
date stops.

Writing it any other way would mean a third mask with two more copies of those rules in it,
which is the drift this composition exists to avoid.

```
0407          → 04/07
04071995      → 04/07/1995
040719951     → 04/07/1995 1
040719951430  → 04/07/1995 14:30
```

**Both halves have to be whole and real** before the value is anything. A complete date
beside a half-typed time is not a moment, and neither is the 31st of February at noon —
`null` covers all three cases, as it does on the `DateField`.

## The shape comes from the locale

`order`, `separator` and `hourCycle` are all read out of `Intl` and all overridable, exactly
as they are on the two fields this is made of. `granularity` adds or drops the seconds and
moves the mask's width and the field's `maxLength` with it.

```tsx
<DateTimeField order="YMD" separator="-" granularity="second" hourCycle={24} />
// YYYY-MM-DD HH:mm:ss
```

## The period is a toggle

`DateTimeField.Period` inside a `FieldGroup`, exactly as on the `TimeField` and for the same
reason: the keyboard a masked field opens is a number pad and cannot produce the letters. It
renders nothing on a twenty-four-hour field, so the same JSX serves both cycles.

```tsx
<FieldGroup>
  <DateTimeField.Field />
  <DateTimeField.Period accessibilityLabel="Morning or afternoon" />
</FieldGroup>
```

## It is a `TextField`

The root is the `TextField`'s root, and `Label`, `Description` and `Error` **are** its slots.
Only the field differs. Everything else — the four variants, `size`, `radius`, `color`,
`labelPlacement`, `isInvalid`, `isDisabled` — is the `TextField`'s.

Controlled the same way: `value` overrides the text only when the two disagree about which
moment they name, so a reader's keystrokes survive a re-render.

## See also

- **`DateField`** — the date half, with a calendar beside it.
- **`TimeField`** — the time half.
- **`DateTimePicker`** — a moment _chosen_ rather than typed.
