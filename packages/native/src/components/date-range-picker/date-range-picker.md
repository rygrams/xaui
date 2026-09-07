# DateRangePicker

A field that opens a month, and takes two days from it.

## Import

```tsx
import { DateRangePicker } from '@xaui/native/date-range-picker'
```

## Usage

```tsx
<DateRangePicker value={stay} onValueChange={setStay}>
  <DateRangePicker.Trigger>
    <DateRangePicker.Value placeholder="Choisir un séjour" />
    <DateRangePicker.Indicator />
  </DateRangePicker.Trigger>
  <DateRangePicker.Sheet previousLabel="Mois précédent" nextLabel="Mois suivant" />
</DateRangePicker>
```

## It owns almost nothing

The trigger **is** a `Select`'s trigger and the month **is** a `RangeCalendar`, which is
itself a `Calendar`. What this adds is the wiring: two ends read into the field through
`Intl`, and a sheet that closes on the second one.

Every rule the `RangeCalendar` has — the third press, the backwards range, the one-day range
— is this component's too, because it is that component.

**A sheet rather than an anchored panel**, for the `TimePicker`'s reason: a month is three
hundred points wide, which beside a field on a phone is the screen.

## The first choice never closes the sheet

A period is **two decisions**, and a sheet that shut after the first would make the second one
a second opening. `closeOnSelect` governs the second only.

## A start with no end reads as itself

Not as `"start – "`. A dash with nothing after it says the field is broken, where a lone date
says it is half answered — which is exactly what it is between the two presses.

The separator is an **en dash** with a space either side, not a hyphen: a hyphen is already
the date separator in half the locales this field serves.

## `variant` dresses the field, `calendarVariant` dresses the month

A `ghost` field over a `primary` month is the ordinary case — the trigger is quiet on the form
and the chosen period is not.

`minValue`, `maxValue`, `firstDayOfWeek` and `locale` pass straight through.
`formatOptions` is `Intl.DateTimeFormatOptions` and reads **each end** with it.

The root **renders no node**: `ref`, `style` and the a11y props live on
`DateRangePicker.Trigger`.

## See also

- **`DateRangeField`** — a period _typed_ rather than chosen.
- **`RangeCalendar`** — the month on its own.
- **`DatePicker`** — one day rather than two.
