---
'@xaui/native': patch
---

Fix a `FieldGroup` prefix or suffix taking no touches on a `primary` field, on Android

`primary` is the one `TextField` variant that lifts its field: `theme.shadows.field`, which
carries an `elevation`. A decorator is laid over that field out of flow and was ordered by
`zIndex` alone — and on Android an elevated sibling holds a _native_ Z that a React `zIndex`
does not outrank, so the field sat over the decorator in the order touches are dispatched and
the `TextInput` under it swallowed the press. The control was plainly visible and did nothing,
on `primary` and on no other variant: a `NumberField`'s stepper pair, a reveal toggle, a clear
button.

The decorator now carries an elevation of its own, one step above the field's own rather than
a number written beside it, so the two cannot drift apart. It draws no shadow: Android takes
an elevation shadow from a view's outline, and a decorator has no background to give it one.
