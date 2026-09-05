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

Three corrections after seeing it on a device.

**The box takes the `lg` radius, 12 points, not `field`.** A field is wide, so 21 on a
48-tall one reads as a rounded rectangle; a code box is very nearly square — 44 by 48 at
`md`, 36 by 40 at `sm` — where the geometric maximum is 22, so the same 21 is a pill in all
but name and is clamped to one outright at the small end. Twelve is where HeroUI lands for
the same box from the other direction: their `field` radius is their `xl`, and their scale's
base is 8 where ours is 12.

**No `ghost`.** The `Input` has one and this does not, because the shape of the component
is different: an input is one wide field whose position the caret and the label already
give away, so it survives having neither fill nor edge. A code is six boxes, and their only
job before anything is typed is to say how many characters are expected and where they go —
with no fill and no border there is nothing to count. It is the reason the `Checkbox` has no
`ghost` either.

**No `xs`.** The box's width is the control height less one spacing step, so `xs` was 28 by
32 — a box that small still has to carry an 18pt character to stay legible, and 18 in 28
leaves no room for the two-point active ring without the digit touching it. A code is also
the one field a user reads back to themselves character by character, which is the worst
place to save eight points. `sm` is the compact size; below it, use fewer boxes rather than
smaller ones.
