---
'@xaui/native': patch
---

feat(calendar): a month, and the day chosen in it

P5.26b, and the first of the date family: the `DatePicker`, the `AgendaCalendar`, the
`RangeCalendar` and the `DateRangePicker` are all this grid with something around it.

**The month on screen is state of its own**, separate from the chosen day. Paging through
months is not choosing: a calendar that jumped back to the chosen month every time you looked
at the next one would be unusable, and one that chose a day because you paged past it would
be worse.

**The grid is always six weeks**, never five for a short month — a grid that changed height
between March and April would move everything under it twice a year. Days from the months
either side fill the ends, muted but still choosable: a calendar that refused the 1st of next
month would be refusing a date you can see.

**`Calendar.Grid` takes a function**, and it is the one place in this library that does.
Forty-two cells are generated from a month rather than written, so there is nothing to
compose against — `asChild` merges into one element and a slot list cannot enumerate a month.
It stays two lines at the call site because **a day is a date plus the calendar around it**:
`Calendar.Day` reads chosen, outside-the-month, out-of-bounds and today off its own `date`.

The chosen day is `bgSelected` / `fgSelected` rather than a variant axis — the `Checkbox`'s
roles for the `Checkbox`'s reason: forty-two cells share one resolution, and a raw `color`
written as an axis would stop reaching the chosen day the moment it became the chosen one.

**The chevrons go dead at the bounds.** A step that would land on a month with no selectable
day has nothing to show, and a chevron that stays lit while it stops working is the worst of
the three options. Bounds compare by **day, not by instant**: a `maxValue` written as
`new Date()` carries the current time, and an instant comparison would refuse the rest of
today.

The week starts where the locale says. `Intl.Locale`'s week info answers it properly where it
exists — Saturday-first locales are real, and a hand-kept list of Monday-first languages has
never included them — with that list as the fallback, not the source.

`utils/dates.ts` is new and tested, twenty-eight cases. Two of its functions exist because
the obvious version is wrong: **`addMonths` clamps to the end of the target month**, since
January the 31st plus a month is the 31st of February and `Date` rolls that to the 3rd of
March; and **`addDays` goes through the day-of-month rather than through milliseconds**,
since a day is not always 86 400 seconds and adding that many across a daylight-saving
boundary lands an hour into the day before.
