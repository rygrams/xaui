---
'@xaui/native': patch
---

Remove `TimeField`. A time typed into a box is `MaskField` with `mask="time"`, which
carries the same mask engine behind one API instead of two, so the field had nothing of
its own left. `TimePicker` — the dial — is untouched.
