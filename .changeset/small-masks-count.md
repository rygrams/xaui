---
'@xaui/native': patch
---

feat(date-field): a date, typed

`DateField` is the `TextField` with its box masked: the same root, the same variants and
sizes, the same label, description and error slots, and only the field differs. The order
and the separator come from the locale through `Intl`, and a mask over one representation —
the digits, in order — is what makes it survive a paste, a punctuation keyboard and a
backspace over a separator.

A date that cannot exist reads as `null` rather than rolling forward into the next month.

`DateField.Trigger` puts a calendar on the trailing edge and `DateField.Sheet` is the month
it opens — a bottom sheet rather than a popover, because a month is three hundred points wide
and on a phone that is the screen. Both are composed rather than props, so a field that is
only ever typed carries neither.

`useOptionalFieldGroup` joins `useFieldGroup`, so a field can leave a decorator its room
without requiring one — the shape `useOptionalChart` already has.
