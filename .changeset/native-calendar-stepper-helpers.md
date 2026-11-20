---
'@xaui/native': patch
---

`Calendar`, `RangeCalendar` and `Stepper` export the arithmetic under them — `monthGrid`, `isSameDay`, `isSameMonth`, `isWithinBounds`, `startOfDay`, `firstDayOfWeekFor`, `weekdayNames`, `monthLabel`, `monthNames`, `nextRange`, `rangePosition`, `isSameRange`, `EMPTY_RANGE` and `stepStatus` (the `Stepper` now reaches the root entrypoint too) — so a calendar or a stepper drawn elsewhere reads the same weeks, ranges and statuses.
