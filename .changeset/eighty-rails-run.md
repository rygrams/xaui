---
'@xaui/native': patch
---

feat(timeline): what happened, in order, with a line through it

`Timeline` has no `gap` on its root and cannot have one: the rail runs the full height of its
entry, so a gap would be a break in the line. `density` is the content's bottom padding, which
is the one measurement that has to be in the right place.

The rail is two halves rather than one line, which is what makes `align` work: below the
marker both are a share of the height so it centres, above it the upper half is a fixed inset
so it sits level with the title's first line. `status` names what happened rather than how
loud it is, and a tint reaches `default` and `current` only — a timeline's greens and reds
mean succeeded and failed.
