---
'@xaui/native': patch
---

`Segment` — a filter: one of a few options, chosen in place.

**It is not `Tabs`, and that is the point.** They wear the same clothes — a pill sliding
under the chosen option inside a filled track, on the theme's own `segment` tokens — and
they do different jobs. A tab bar wraps content: its triggers name panels that live under
it, and it says `tablist` / `tab` out loud. A segment names nothing; it holds a value the
way a radio group does, and says `radiogroup` / `radio`. Which of the two a control is, is
what a screen reader hears, so it cannot be a flag on one component.

**The pill is not a slot.** `Tabs` makes you write its indicator because a tab bar can be
`light` and have none. A segment without its pill is not a segment, so the root draws it.

**Separators, off by default.** `hasSeparator` draws a hairline between the options the pill
is nowhere near, for a list long enough to need dividing. Both edges of the pill stay clear:
a rule running into a raised surface reads as a crack in it, which is what iOS has done
since the segmented control existed and why one does not look like a table. The rule belongs
to the option on its trailing side, so an option decides alone from the rectangles every
option already publishes — the root cannot know which child is which without reading its
props, and that is introspection this library does not do.

The tint reaches the **word** as well as the pill: `fgSelected` is a role rather than a token
named in a state, so the tint pass follows it. Without that, a tinted segment would slide a
coloured pill under a word that had stopped reading against it.

The sliding itself moves to `hooks/use-sliding-indicator`, shared with the `Tabs` — §2 bis,
promotion at the second use. Both are a filled shape following the chosen child along a row,
and the two behaviours worth getting right are the same for either: nothing drawn before the
first layout, and a first placement that jumps where every one after it springs.
