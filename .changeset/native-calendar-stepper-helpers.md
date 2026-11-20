---
'@xaui/native': patch
---

The date arithmetic under the calendars moves from the private `utils/` into `system/dates`, public from `@xaui/native/system`: `monthGrid`, `weekGrid`, `isSameDay`, `isSameMonth`, `isWithinBounds`, `startOfDay`, `startOfWeek`, `addDays`, `addMonths`, `daysInMonth`, `firstDayOfWeekFor`, `weekdayNames`, `monthLabel`, `monthNames`, and the ranges' `nextRange`, `rangePosition`, `isInRange`, `isSameRange` and `EMPTY_RANGE`. `Stepper` exports `stepStatus` and now reaches the root entrypoint — so a calendar or a stepper drawn elsewhere reads the same weeks, ranges and statuses.
