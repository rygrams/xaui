---
'@xaui/native': patch
---

feat(combobox): a field you type in, over a list you must choose from

The `Autocomplete` with the search moved into the trigger. In an autocomplete the control
shows the chosen row and you type in a box inside the panel; here the field **is** the
trigger, on the line where a `TextField` would be, rather than a button that opens a search.
That is the ARIA combobox, and it is the shape a form wants.

**The list is closed.** What is typed narrows the rows and never becomes the value: the
query goes with the panel, so closing without choosing puts the chosen row's label back in
the field. A combobox that kept the half-typed word would be a text field with a dropdown
attached, which is a real control and a different one.

**The panel, the rows and the empty line are the `Autocomplete`'s own objects**, not copies
— `Combobox.Content` _is_ `Autocomplete.Content`. A row is a row whichever field opened it,
and a second set would drift into a form with two panels half a shade apart. The
load-bearing half of that: `Autocomplete.Content` tells its children apart **by identity**,
so a `Combobox.Item` that were a different component would be sorted into "not a row", would
never be filtered, and would never register its label. The root is that component's too,
wrapped rather than aliased — hanging slots off the autocomplete's own function would
overwrite `Autocomplete.Trigger` for everyone.

Three slots are this component's own, and each is what it is for a reason. **The trigger is
a `View`, not a `Pressable`**: the thing you press is the input inside it, and a pressable
wrapper around a text field is a second target laid over the one that already takes the tap.
**The input fills the box** and takes the trigger's own text style, so the control does not
change size as you type. **The chevron is a control** where the autocomplete's is a
decoration — that trigger is itself pressable, this one is a field that raises a keyboard,
so the way into the list without typing has to be the chevron.

`filterItems` and `matchesQuery` move to `utils/filter-items.ts` beside `collectItemLabels`,
which was promoted for the same pair one component earlier. §2 bis: promotion at the second
use.
