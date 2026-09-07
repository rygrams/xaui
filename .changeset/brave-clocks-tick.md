---
'@xaui/native': patch
---

feat(time-field): a time, typed

`TimeField` is the `DateField`'s sibling: the same `TextField` root, the same three text
slots, and one representation — the digits, in order — that `maskTime` is the only thing to
turn into text. The hour cycle comes out of `Intl`.

The period is a toggle rather than two letters typed into the box, because the keyboard a
time field opens is a number pad and cannot produce them. `TimeField.Period` renders nothing
on a twenty-four-hour field, so the same JSX serves both.
