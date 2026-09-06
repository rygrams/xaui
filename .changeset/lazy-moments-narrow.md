---
'@xaui/native': patch
---

feat(date-time-picker): a field that opens a month, and then a clock

`DateTimePicker` owns nothing: the field is a `Select`'s trigger, the two steps are a `Tabs`,
the month is a `Calendar` and the dial is a `TimePicker` — four components rendered as
themselves, and no recipe of its own.

Two steps rather than two fields, because a moment is one value and a calendar and a clock
will not fit on a phone together. Each half keeps the other, so the value is one moment being
narrowed rather than two being collected.

`TimePicker.Indicator` now reads `IconContext` rather than its own picker's context, which is
what lets another field render it.
