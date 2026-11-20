---
'@xaui/native': patch
---

The `Table`'s selection and sort arithmetic moves from the private `utils/` into `system/selection`, public from `@xaui/native/system`: `toggleKey`, `toggleEveryKey`, `isEveryKeySelected`, `isSomeKeySelected` and `nextSort`, and the `useTableState` hook that holds a table's column widths, registered rows, selection and sort on top of them, with the `SelectionMode` and `SortDescriptor` types — so a table drawn elsewhere chooses and sorts exactly as Native's does.
