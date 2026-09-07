---
'@xaui/native': patch
---

A WheelPicker reads at a glance again, and turns under a parent scroll:

The row at the middle is **bold**, on top of the band's colour — weight now says which row
is chosen together with where it sits, and unfocused rows hold the body weight. The fade and
lean away from the middle were doing that alone, and a still wheel next to a still list read
as the same thing.

The columns set `nestedScrollEnabled`, because a wheel most often sits inside a scroll of its
own — on Android a vertical `ScrollView` under a vertical `ScrollView` keeps the gesture for
itself unless the child asks, and a wheel that will not turn is not a wheel.

Rows are a size step taller — `sm` 36, `md` 40 — so the band reads as a target you aim at
rather than a hairline, and a turning row has room to lean into. `lg` keeps its 44.

`ghost` and `tertiary` rows name `accentSoftForeground` rather than `foreground`, and
`secondary`'s band is `defaultSoft`: under a tint, a bare `foreground` resolves to the tint
itself, which painted the row the colour of the band it sits on.
