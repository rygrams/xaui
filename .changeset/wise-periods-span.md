---
'@xaui/native': patch
---

feat(date-range-field): a period, typed — two dates in one box

`DateRangeField` is `maskDate` twice over one stream of digits: the first eight are the
start and the rest are the end, so every rule that mask already has is kept rather than
copied, and the dash appears the moment the ninth digit does.

The two ends are reported independently — a reader who has finished the start and is halfway
through the end has a start. Whether the end is _after_ the start is a rule about the range
rather than about what was typed, so it stays the caller's `isInvalid`.
