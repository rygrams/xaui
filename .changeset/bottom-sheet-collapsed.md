---
'@xaui/native': patch
---

`BottomSheet` gets a reduced state.

`collapsedHeight={200}` gives the sheet a second disclosure inside the first: it is either
up or gone, and while it is up it is either full or reduced. `isExpanded`,
`defaultExpanded` and `onExpandedChange` control it the way `isOpen` controls the other.

These are not snap points — two states, not an array of positions.

Where the sheet cuts comes from `BottomSheet.Summary`, a new slot: it is `<summary>` to the
sheet's `<details>`, the part that survives rather than a different view for the reduced
state. It renders in both, and reports where its bottom edge falls so that whatever sits
above it — a handle, usually — is counted too. The sheet adds its own bottom padding back
onto that edge: cutting on the summary's last pixel leaves the reduced sheet with air above
the handle and none under the last line, the text against the screen edge and under the
gesture bar on a phone that has one. `collapsedHeight` is not extended that way — it is a
number written against a sheet someone was looking at — and it stays as the fallback for a
sheet with no natural seam, the summary winning when both are given.

Either way the sheet is not re-laid out. It is the same box at its full height, moved
further down, so the tail slides off the bottom of the screen and comes back untouched.

A drag that was not decisive puts the sheet back. Decisive down goes one state down, unless
the throw was aimed past the reduced notch, in which case it dismisses: dragging a sheet the
whole way to the bottom and having it stop half open reads as a refusal. Decisive up
expands. Without a `collapsedHeight` none of this applies and the sheet behaves exactly as
before.

`BottomSheet.Handle` becomes a real control on a collapsible sheet, the way an
`Accordion.Trigger` is — a drag would otherwise be the only way in and out of the reduced
state, and a drag is a gesture some people cannot perform. It warns in development without
an `accessibilityLabel`.
