---
'@xaui/native': patch
---

`TagGroup` — List · Item · ItemLabel · ItemRemoveButton

**It is not a row of `Chip`s**, and that answers a question this roadmap has carried since
`TagGroup` was first listed beside a `Chip` that already shipped.

A chip is a piece of metadata that is always the same. A tag is one you can turn on, take
off, or both. The selection state and the removal are the component; the pill around them
is the least of it — which is also why the two do not share a recipe. A chip has ten
variants because it reports an intent; a tag has two grounds because it reports nothing at
all until it is selected.

**Two grounds, not two emphases.** `default` is the theme's neutral fill, `surface` the card
colour, and they swap so a tag never disappears into what is behind it: a group on a card
wants one, a group on the page wants the other. A selected tag leaves both for the accent's
soft slice, the only place this component uses colour.

**The cross renders nothing without an `onRemove`.** Removing a tag is the caller's list
changing, and a cross that appeared to work while the list stayed put would be worse than
one that is plainly not there. It is written out rather than drawn by the item, because a
tag you can turn on and a tag you can take off are different controls and most groups are
only one of the two.

It reads `system/close-button`, so the press state, the grown touch target, the
missing-label warning and the drawn cross are the shared ones — six lines here, and the
third component to read them after `Chip` and `Alert`.

The selection rule is a pure function with ten tests, and it returns the list **unchanged**
whenever a press changes nothing: `useControllableState` drops a set to the value it already
holds, so `onSelectionChange` never fires for a change that did not happen.

Both faces of a tag are resolved once on the root, so a group of forty costs what a group of
two costs and no slot touches the recipe (R5).
