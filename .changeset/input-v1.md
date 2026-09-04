---
'@xaui/native': patch
---

feat(input): the v1 `Input` — P3.7

A text field with the label, the hint and the error that make it usable. Compound root
plus four slots: `Input.Label`, `Input.Field`, `Input.Description` and `Input.Error`.

**The root is the column, not the field.** `Input.Field` is the `TextInput`, which is what
makes the three lines slots of one component rather than three components a form has to
keep in step — and why `TextInputProps` are on the field rather than on the root.

The first real use of the theme's `field*` family, derived in P0 and unread since. Four
variants, the library's emphasis levels narrowed like the `Card`'s, splitting HeroUI's
two-name `primary | secondary` by saying what each of their ends already is: `primary` is
their field fill plus the theme's `field` shadow, `secondary` their neutral fill and the
default here, `tertiary` the border alone, `ghost` neither.

Focus darkens the border towards the mode's ink — `fieldBorderFocus`, no ring and no
accent. `isInvalid` outranks it, so a field that is both reads as wrong rather than as busy.

`labelPlacement="inside"` lifts the label into the box. It is taken out of flow and placed
against the box's own padding, so the JSX is identical either way and nothing is
reparented; the field pays for the room and the box grows by the same amount.

Visually aligned with `heroui-native`: a 48pt minimum, 12pt of horizontal padding, a 16/24
label above the field and a 14/20 line below it at `md`. The height is a **minimum** rather
than fixed — the one place this component departs from the `Button`'s rule, because a
`multiline` field holds the user's own text and has to grow.

Adds a `borderFocus` role to `system/recipe`, so a state can read the variant's own focus
colour the way `bgPressed` lets a pressed `Button` darken its own fill — and so a raw
`color` follows the field into focus.
