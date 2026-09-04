---
'@xaui/native': patch
---

feat(input-otp): `InputOTP` — a one-time code, one character to a box

Not one of the fifteen the 1.0 core is scoped to, so it ships as a P5 component under
`1.x`. Its API is the `Input`'s: the same four levels over the theme's `field*` family,
the same `size`, `radius`, `color`, `isInvalid` and `isDisabled`.

**One hidden `TextInput` holds the whole code**, and the boxes are a rendering of that one
string. Six focusable boxes is the design every OTP component starts with and abandons —
the caret has to be moved by hand, a backspace at the start of a box has to jump backwards,
and a paste arrives in one box out of six. Here a keystroke, a backspace, a paste and an
autofilled `one-time-code` all take the same path.

Paste keeps only the code: a run of exactly `maxLength` digits with no digit on either side,
so "Your code is 482913, it expires in 10 minutes" yields `482913` and not `Your c`.

`InputOTP.Group` takes a render function — the one slot in the library that does, because
the number of children here is `maxLength` rather than markup. `ref` is the imperative
handle (`focus`, `blur`, `clear`) rather than the view, since those are the three things
only the hidden input can do.

Fifteen tests on the pure helpers — `buildSlots`, `extractPastedCode`, `isPaste`. The
component itself is verified by its demo screen, as every other one is.
