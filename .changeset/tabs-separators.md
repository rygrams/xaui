---
'@xaui/native': patch
---

`Tabs` draws a hairline between the tabs the pill is nowhere near.

`hasSeparator` is what separates a segmented control from a tab bar wearing the same
clothes. It is off by default: the pill already says which tab is chosen, and the rules are
what a segmented control adds when its options are peers to compare rather than places to
go.

Both edges of the pill stay clear — a rule running into a raised surface reads as a crack in
it, which is the behaviour iOS has had since the segmented control was introduced and the
reason one does not look like a table.

The rule belongs to the tab on its trailing side, which is what lets a trigger decide alone:
the list has no way to know which of its children is which without reading their props, and
that is introspection this library does not do. Every trigger already publishes its
rectangle for the indicator to slide to, and an ordering is all this needs — so before the
first layout nothing is drawn, and the rules arrive with the pill rather than a frame ahead
of it.

This closes P5.9. A separate `SegmentButton` would have been `Tabs` in `primary` renamed:
the pill, the track and the `segment` tokens are already there, and a segmented control used
as a form choice is `accessibilityRole="radio"` on the trigger, which R9 has always allowed.
