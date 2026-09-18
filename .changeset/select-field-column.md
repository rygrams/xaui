---
'@xaui/native': patch
---

feat(select): the field gets its label, its hint and its error

`Select` had no label. It is a field — it sits on the line where a `TextField` would, and
its recipe is the `TextField`'s token for token — so a form using one had to label it from
outside the component: a second column to keep in step, and a label a screen reader never
associates with the control. `isInvalid` moved the border and nothing else could say why.

The root is now the **column**, the `Autocomplete`'s shape: a `View` that stacks
`Select.Label`, the trigger and `Select.Description` / `.Error` with one `gap`, so JSX
order is screen order. The column, the label and the help lines resolve through
`textFieldRecipe` rather than a second table, so a select and a text field stacked in one
form read as one control. `isInvalid` turns the label and the description `danger`; it
never mounts `Select.Error`, which stays yours to write.

The trigger points at the two slots through `aria-labelledby` and `aria-describedby`, so
what is announced is what the field asked for rather than only the row that happens to be
chosen. Mounting the slots is all it takes; your own is still the last word.

`disabled` now dims the column once instead of dimming the trigger a second time inside
it. The root takes `ref`, `style`, `asChild` and R14's style props for that column; the
control keeps its own on `Select.Trigger`.

**Breaking, on the `beta` line: `Select.Label` is now the field's label.** The heading over
a run of rows inside the panel is `Select.GroupLabel` — the two were one name, and the
field's label is the one callers reach for. Rename the slot inside `Select.Content`:

```diff
  <Select.Content>
-   <Select.Label>Langues</Select.Label>
+   <Select.GroupLabel>Langues</Select.GroupLabel>
```

The recipe slot moved with it, `label` to `groupLabel`, and `SelectLabelProps` now types
the field label — the panel heading is `SelectGroupLabelProps`. The root also renders a
node where it rendered none, so a `Select` laid out as a flex child is now that column
rather than its trigger.
