---
'@xaui/native': patch
---

feat(autocomplete): the field gets its label, its hint and its error

`Autocomplete` and `Combobox` had no label. They are fields — a combobox sits on the line
where a `TextField` would — so a form using one had to label it from outside the component,
which is a second column to keep in step and a label a screen reader never associates with
the control.

The root is now the **column**, the `DatePicker`'s shape: a `View` that stacks
`Autocomplete.Label`, the trigger and `Autocomplete.Description` / `.Error` with one `gap`,
so JSX order is screen order. `Combobox` gets the same three slots under its own name — its
root *is* the `Autocomplete`'s, so the column comes with it, and a combobox labelled
differently from the text field beside it is exactly the drift this sharing prevents.

The column, the label and the help lines resolve through `textFieldRecipe` rather than a
second table, so they are the `TextField`'s token for token. `isInvalid` turns the label and
the description `danger`; it never mounts `Autocomplete.Error`, which stays yours to write.

The trigger — and the `Combobox`'s input — points at the two slots through `aria-labelledby`
and `aria-describedby`, so what is announced is what the field asked for rather than only the
row that happens to be chosen. Mounting the slots is all it takes; your own is still the last
word.

`disabled` now dims the column once instead of dimming the trigger a second time inside it.
The root takes `ref`, `style`, `asChild` and R14's style props for that column; the control
keeps its own on `Autocomplete.Trigger`.
