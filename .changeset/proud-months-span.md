---
'@xaui/native': patch
---

feat(range-calendar, date-range-picker): a month that takes two days

`RangeCalendar` is a `Calendar` — the same root, and five of its seven slots re-exported
rather than wrapped. Only the day cell differs, and only by having a band behind it, which is
possible because `Calendar.Grid` takes a function child.

Three presses and not two: a range already chosen starts a new one, a day before the start
becomes the start rather than a backwards end, and a one-day range is allowed.

`DateRangePicker` puts that month behind a `Select`'s trigger, in a sheet that closes on the
**second** end only — a period is two decisions.
