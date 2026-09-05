---
'@xaui/native': patch
---

`Accordion` — Item · Trigger · Indicator · Content

P5.11, over the legacy `ExpansionPanel`. HeroUI Native calls it `accordion` and so does
this, which is also what the roadmap row now says.

**The height is never measured.** The panel is mounted or it is not, and Reanimated's
layout transition animates the row between the two — `LinearTransition.springify()` on
HeroUI's numbers, damping 140 against stiffness **1600**. Stiffer than the chevron's 1000
deliberately: a height is a longer distance than a rotation, and at the chevron's
stiffness the same damping makes a long panel take almost half a second to settle.

Measuring it would mean a hidden pass on every open, and a panel whose content grows
afterwards — an image loading, a list filling — would be stuck at the height it had when
it was measured. The container carries the same transition, because without it the
accordion's own height jumps to its new total in one frame while the rows inside it are
still animating.

**The variant table is the `Card`'s, token for token.** An accordion in `default` _is_ a
card with rows in it, and two containers that look alike but are declared apart drift —
the drift showing up as an accordion sitting on a card with a fill one step off it.
`ghost` is the default and is HeroUI's own: rows separated by hairlines, on whatever page
they sit on.

**The separators are the root's, drawn between its children.** A row that drew its own
would draw one under the last item too, and every accordion would start by hiding it.
They come off `Children.toArray`, which drops nulls, so a conditionally rendered row
cannot leave a hairline hanging where nothing is.

**The open state moves to the root.** Legacy asked each item whether it was open, which is
what made "only one at a time" the caller's problem. One value on the container is what
`selectionMode` needs to mean anything. The whole rule is a pure function with thirteen
tests, including the two cases where it returns the value unchanged — a press refused
under `isCollapsible={false}` must not fire `onValueChange` for a change that did not
happen.

`ChevronDownIcon` moves from the `Select`'s folder to `system/icon` and is exported from
`@xaui/native/system`. Two components draw it now, which is §2 bis exactly: promotion at
the second use, never by anticipation.
