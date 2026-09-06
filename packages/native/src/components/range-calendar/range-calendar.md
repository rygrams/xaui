# RangeCalendar

A month, and the period chosen in it.

## Import

```tsx
import { RangeCalendar } from '@xaui/native/range-calendar'
```

## Usage

```tsx
<RangeCalendar value={stay} onValueChange={setStay}>
  <RangeCalendar.Header>
    <RangeCalendar.PreviousButton accessibilityLabel="Mois précédent" />
    <RangeCalendar.Title />
    <RangeCalendar.NextButton accessibilityLabel="Mois suivant" />
  </RangeCalendar.Header>
  <RangeCalendar.Weekdays />
  <RangeCalendar.Grid />
</RangeCalendar>
```

## It is a `Calendar`

The root is the `Calendar`'s root, unchanged — the same variants, the same `size`, `radius`
and `color`, the same month state, the same bounds, the same weekday names.

`Header`, `Title`, `PreviousButton`, `NextButton` and `Weekdays` **are** its slots,
re-exported rather than wrapped. Only the day cell differs, and only by having a band behind
it.

That is possible because **`Calendar.Grid` takes a function child**: forty-two cells are
generated rather than written, so replacing the cell is the one composition point that
component published — and this is what it published it for.

The `Calendar` below holds **no chosen day of its own**: a range has two ends and its `value`
has room for one, so the cells paint themselves off this component's context instead.

## Three presses, not two

| the state        | pressing a day                               |
| ---------------- | -------------------------------------------- |
| nothing chosen   | it becomes the start                         |
| a start, no end  | on or after it → it becomes the end          |
| a start, no end  | **before** it → it becomes the new **start** |
| both ends chosen | a **new** range starts from it               |

**A range already chosen starts a new one.** Asking a reader to clear first is asking them to
find a control that should not need to exist.

**A day before the start becomes the start**, not an end that precedes it. A backwards range
is not a range, and silently swapping the two would move a bound the reader did not touch.

**A one-day range is allowed.** A one-night stay and a one-day event are real, and a picker
that cannot express them is one a caller has to work around. Its cell draws as a single mark
with **no band** — a strip under one cell would read as a range somehow wider than the day it
contains.

Every end is taken to midnight, for `startOfDay`'s reason: a range whose ends carry the
moment they were pressed compares unequal to the same two days written by the caller.

## The band

Three slots and no more: the cell, the type, the muted day, the today dot and the chosen day
are all the `Calendar`'s. A day in a range is one of its cells with a band behind it.

The band is **out of flow and a point wider than the cell on each side**. Out of flow so
nothing about the day's own layout moves when it appears; wider because a seventh of a row is
a fraction, and a band stopping at the cell's own edge leaves a hairline of background between
two days on a screen whose width does not divide by seven.

The two ends are rounded on their **outer** side only — `start` and `end`, never left and
right (R13) — so seven cells read as one strip with one shape.

`color` reaches the band through `bgSelected`, the same role the chosen ends take, so a tinted
range is tinted throughout.

## See also

- **`Calendar`** — one day rather than two.
- **`DateRangePicker`** — this month behind a field.
