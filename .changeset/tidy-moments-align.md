---
'@xaui/native': patch
---

feat(date-time-field): a moment, typed — a date and a time in one box

`DateTimeField` is the two masks in sequence over one stream of digits: the first eight are
the date and the rest are the time, so `maskDate` and `maskTime` keep every rule they
already have rather than a third mask copying them. Both halves have to be whole and real
before the value is anything.

One box rather than two fields side by side — a moment is one value, and two boxes make a
reader tab between them and decide which one an error belongs to.

`@xaui/native`'s DTS build heap moves from 6 GB to 8 GB; the entry count had outgrown it.
