---
'@xaui/native': patch
---

feat(mask-field): a value typed into a shape

`MaskField` is the `TextField` with its box masked: the same root, the same variants and
sizes, the same label, description and error slots, and only the field differs. There is
one representation — the accepted characters, in order — and `maskInput` is the only thing
that turns them into text, which is what makes the field survive a paste, a punctuation
keyboard and a backspace over a separator.

`mask` is a preset or a pattern. `'date'`, `'time'`, `'datetime'` and `'credit-card'` carry
their own rules — the date order and separator from the locale through `Intl`, and a part
clamped as it completes and never raised. A date that cannot exist stays out of the box the
moment the month is known. Anything else is a pattern string: `#` a digit, `A` a letter,
`*` either, every other character a literal put back in as the parts fill.

The value is the masked string. `convert` is the one plug that turns it into a value of
your own — `parseMaskedDate` and `parseMaskedTime` are exported for the `date` and `time`
shapes, and `MASK_FIELD_MASKS` lists the presets.

`useOptionalFieldGroup` joins `useFieldGroup`, so a field can leave a decorator its room
without requiring one — the shape `useOptionalChart` already has.
