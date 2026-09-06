---
'@xaui/native': patch
---

feat(time-picker): a field that opens a clock

`TimePicker`'s trigger **is** a `Select`'s trigger and its panel is a `BottomSheet` — a
clock face is close to three hundred points square, which beside a field on a phone is the
screen. What it adds is the dial: two rings on a twenty-four hour face, sixty marks and
twelve labels on the minutes, and the hours handing over to the minutes on the first press.

The geometry is `utils/clock.ts`, tested — the quarter turn that puts twelve at the top, the
sign that keeps it above the centre in coordinates that grow downwards, and the conversion
from `atan2`'s own convention.
