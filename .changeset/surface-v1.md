---
'@xaui/native': patch
---

`Surface` — a ground for other things to sit on

**One node and no slots**, which is the point: a surface is a fill, a corner and some
padding, and every other component in this library that needed those three has been writing
them out again. It is the smallest thing here and the most reused.

**It is not a `Card`.** A card has decided things for you — it is always lifted, it has a
header and a footer, and its levels carry an emphasis. A surface has decided nothing.

**A ladder, not four emphases.** `primary` sits on the page, `secondary` inside a `primary`,
`tertiary` inside a `secondary`, and each is a token the theme already names — so a nest is
legible in both modes without anyone choosing greys. Three is as deep as that reading
survives; a fourth would be a shade nobody could place. `ghost` at the end is not a level
but the absence of one.

**Elevation is asked for rather than tied to the variant**, and defaults to true for
`primary` alone: a shadow under a ground that barely differs from the page reads as dirt
rather than as height. Whether a ground is above the one under it is the layout's business —
the same `secondary` is flat inside a card and lifted floating over a list.

Its props list is six lines because everything else a surface could be is already a style
prop. There is nothing here a prop had to be invented for.

`Card`, `Popover`, `Accordion` and `Dialog` should read it. None of them does yet: that is a
refactor rather than a component, and it wants its own change so a regression in one of the
four is not hidden inside a new file.
