---
'@xaui/native': patch
---

feat(badge): the v1 `Badge` — a count, a dot, and the corner it hangs off

The twelfth entry of the core, and **one node with no slots**, per the plan: whatever is
inside a badge is one line of two or three characters, and a slot would be a name for a
`Text` the component can just as well insert itself (R3).

**It is not a small `Chip`.** A chip holds a word and hugs it; a badge holds a count and is
round unless the count is too wide to be. That is the `minWidth` equal to the height — one
digit is a circle, two are a capsule — and it is why the label stays at 12pt through three
of the four sizes: a count that grows with its badge stops being a count. The heights sit
below the `Chip`'s, 16/18/20/24 against 20/24/28/36.

**`danger` is the default**, the only component in the library whose default is not the
first name in its ladder. A badge is overwhelmingly the count of something that wants
attention — unread, failed, overdue — and a red one is what `<Badge>3</Badge>` means.

`isDot` is the bare circle, on its own diameter ladder (6, 8, 10, 12) rather than the
height, because a 20pt circle beside a 16pt icon is not a dot. It reaches the recipe as a
`dot` axis selected by the resolved size: an axis left unselected contributes nothing, which
is exactly "this badge has a label" — where a `{ true, false }` axis would have needed a
branch with nothing to say and a `size × isDot` compound would have been sixteen entries for
four measurements.

`placement` makes the parent whatever the badge decorates: absolutely positioned in that
corner, pulled out by half its own height on each axis so its centre lands on the corner it
marks. The offset is derived from `size`, which is why it is a prop and not four style keys
at the call site — and the keys are `start` and `end` (R13), so a trailing-corner badge
mirrors in RTL. The insets are computed **outside the style cache**, and have to be: in flow
the node is `position: 'relative'`, where an inset is a nudge rather than a placement, so a
cached `top: -10` would shift every badge that has no placement at all.

`placementInsets` is the one pure function here, and it has the one test file.
