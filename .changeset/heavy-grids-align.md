---
'@xaui/native': patch
---

feat(table): rows and columns, with a shell round them

`Table` is three nodes and each earns its place: the shell clips and does not move, the
scroll container moves, and the content inside it is allowed to be wider than the shell.
Widths are declared by the column and read by position, so a cell and its column never name
each other.

The table never reorders anything — sorting reports the press and the caller sorts their own
collection — and the third press clears the sort, so there is a way back to the table's own
order. `Table.Body` takes `asChild` rather than a `virtualized` prop: a table of ten thousand
rows is a `FlatList`.

`utils/selection.ts` carries the selection and sort arithmetic, tested — including the
half-filled header box, the disabled row it must not count, and the keys chosen on another
page it must not clear.
