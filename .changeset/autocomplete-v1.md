---
'@xaui/native': patch
---

`Autocomplete` — a field that opens a list you search.

**It is not a `Select`, and it wears its clothes.** A select is for a list you read: a dozen
options, all of them visible, and choosing is recognising one. An autocomplete is for a list
you cannot read — fifty states, four thousand cities — where choosing is _finding_, and the
field you type in is the control rather than an extra row in a menu.

So the two share their style **by construction** rather than by coincidence: the trigger, the
panel and the rows resolve through `selectRecipe`, and only the search box and the empty line
are this component's own. A second table would be two to keep in step, and the drift would
show as a select and an autocomplete side by side in a form with fields half a shade apart.

`Autocomplete.Search` lives inside the panel and is pinned above its scroller, so it stays
put while the results move under it. It takes focus as the panel opens — one you have to tap
twice before you can type into it is a select with a spare row — and **the query goes with
the panel**: closing clears it, because a search that survived its own closing would leave
the list already filtered by a word nobody can see.

Matching folds diacritics and drops case both ways (`geneve` finds `Genève`), and matches
any word rather than the first: a prefix match on "New York" refuses "york", and a long list
is searched by whichever word someone remembers.

Filtering drops rows off the **elements**, before any mounts, and only the panel's direct
children. Walking deeper to read a label changes nothing; dropping a row nested inside a
caller's own component would mean rebuilding that component's children for it, and a filter
that silently rewrote a caller's tree is worse than one that leaves it alone.

`Autocomplete.Empty` renders instead of the results, and only when nothing matched — a panel
that filtered its last row away and showed an empty box reads as a control that has broken.

The trigger announces itself as a `combobox` rather than a button: it opens a list you type
into, and that is the role that says so.

`collectItemLabels` moves to `utils/item-labels` — the `Select` and the `Autocomplete` have
the same trigger, the same portal and the same problem. §2 bis, promotion at the second use.
