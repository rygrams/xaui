---
'@xaui/native': patch
---

feat(radio): `Radio.Group` — the set an option belongs to

`Radio` shipped without one, which meant the one thing a radio is for — exclusive selection
— was the caller's `useState` and their `map`. This is the context it was written to read,
not a second radio.

**It is `Radio.Group`, not a `RadioGroup` import.** The set publishes the values an option
already reads and nothing else; a second module to make three radios exclusive would be a
seam with nothing behind it. `RadioGroup` is exported as an alias for a call site that reads
better naming it.

**Membership is a `value`, not a nesting.** The group holds the chosen one, each option
compares the one it stands for, and nothing walks the children — so an option inside a
`Card`, a `List.Item` or a `Fragment` is in the set exactly as much as a direct child is.
That is also what keeps a standalone radio over its own `isSelected` working unchanged
inside a group: an option with no `value` is not in the set at all.

`variant`, `size`, `radius` and `color` are handed down as **defaults**, and an option that
names its own wins — a set is usually uniform, and the row that differs is a design rather
than a mistake. `isDisabled` and `isInvalid` are the two that do not work that way: a
disabled set has no enabled option in it, and a set that is wrong is wrong on every row.

The group lays its options out, which is R4 and the reason it has a recipe at all — the gap
follows `size`, and `orientation="horizontal"` wraps rather than overflowing off a narrow
screen. It paints nothing, because an option resolves its own colours and a group that
painted would be painting over the row that disagreed with it.

`isSelected` still outranks the set, so one option in a group can be driven by something the
group knows nothing about, and both callbacks fire on a press: the option's
`onSelectedChange` and the set's `onValueChange`. Pressing the chosen option fires neither —
a press selects and never clears, one level up from where the `Radio` already said so.

`useRadioGroup()` is exported (R10) for an option of your own that is in the set without
being a `Radio`. `accessibilityRole="radiogroup"` moves onto the group, where the wrapper in
the old three-line recipe used to carry it.
