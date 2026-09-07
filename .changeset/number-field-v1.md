---
'@xaui/native': patch
---

`NumberField` — Label · Decrement · Field · Increment · Description · Error

P5.3c, over the legacy `NumberInput`, and named the way `TextField` and `MaskField` are:
the roadmap row said `NumberInput`, and the rename that made `Input` into `TextField`
applies to it too.

**It is a `TextField`.** The root is that root, unchanged — the same recipe, the same four
variants, the same `size`, `radius`, `color`, `labelPlacement`, `isInvalid` and
`isDisabled` — and `Label`, `.Description` and `.Error` **are** the `TextField`'s slots,
re-exported rather than wrapped. Only the field differs, by reading a number out of what is
typed into it. The `MaskField`'s arrangement exactly.

**Two representations, and the caret is what swaps them.** Out of the field the value is
written by `Intl`, with `formatOptions` passed through untouched — a currency, a unit, a
fixed number of decimals. Into it, everything that is not a digit, a sign or the decimal
mark is **dropped rather than refused**: the value the caret lands in is grouped, and
rejecting its own separators would make the first keystroke clear the box. On the way in the
value is rewritten plainly, so nobody types a euro sign back in. A full stop passes as the
decimal mark wherever the locale is not using it to group, so `1.5` is one and a half in
`fr-FR` and `1.234` is still a thousand-odd in `de-DE`.

**The bounds land when the reader leaves, not while they type.** `min={10}` and a reader on
their way to `15` types a `1` first; clamping that would take the keyboard away from them.
Until the field is left `onValueChange` reports what is actually in the box, and the clamp
falls on blur and on every press of a stepper. The value is `number | null` — `null`, never
`NaN`, because "not a number yet" is a state and `NaN` is a value that propagates.

**The steppers are `FieldGroup` decorators**, like `TimeField.Period`: that is what lays a
control over a field and measures it, so the box stays the `TextInput` itself.
`.Decrement` takes the leading edge and `.Increment` the trailing one, because the value
sits between them. Each goes flat and stops taking presses when it has nowhere left to go —
asked of the **result** rather than of the bound, so a value half a step short of the
ceiling can still reach it. With no children each draws its own mark out of one bar, or two
a quarter turn apart, the close button's construction, so the field works in a project that
has installed no icon set.

The engine is four pure functions with a test each — `parseNumber`, `formatNumber`,
`clampNumber`, `stepNumber` — re-exported from the subpath for a caller building a stepper
of their own. `stepNumber` rounds to the precision of the numbers that built the value, the
`Slider`'s rounding for the `Slider`'s reason: three steps of a tenth are `0.3` and not
`0.30000000000000004`.
