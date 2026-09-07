---
'@xaui/native': patch
---

feat(close-button): the dismiss affordance, on its own

`Chip`, `Alert`, `Dialog`, `Popover` and `BottomSheet` all have a close. Each is five lines
over a shared base that owns the behaviour — its own press state, the grown touch target,
the missing-label warning, the cross drawn from two rotated bars — and each hands that base
the styles its own recipe resolved. What was missing is the standalone one: a dismiss on
something the library does not own, a card header, a banner, a sheet of your own.

**The base is renamed, and that is the whole of the breaking change.** `system/close-button`
now exports `CloseButtonBase` and `closeButtonGeometry`; the public component takes the name
`CloseButton` in `@xaui/native/close-button`. Two things called `CloseButton` in one root
barrel is not a naming preference, it is an ambiguous re-export — and the split is worth
saying out loud anyway: a close _inside_ a component takes that component's colours and that
component's scale, so `Chip.Close` reaches for the base, and dropping a dismiss into a
layout reaches for the component. The five existing call sites move with it.

The recipe is what the component adds. Four emphasis levels and **no intent** — dismissing
is neither a success nor a danger, and the close that carries an intent is the one inside a
component that has one. `secondary` is the neutral disc and the default, for the reason the
`Dialog` gives at its own close: a cross floating on a panel with nothing under it reads as
decoration, and the disc is what makes it a target. `ghost` is the bare cross for a
component already providing one.

Four sizes on a 24 / 28 / 32 / 40 box, `md` being HeroUI's measured and the `Dialog`'s. The
bar is a ratio of the box rather than a table — a bar rotated a quarter turn spans
`length / √2` per axis, so it is twice as long as the cross looks — which makes it one cross
at four sizes instead of four drawings of one. **The stroke does not scale**: it is the
thickness the `Chip`, the `Alert` and the `Dialog` already draw at, and crosses that
thickened with their box would read as four different marks.

**No pressed colour**, unlike every other control here. The base owns the press state,
because a cross has to be a different target from the panel around it, so the root cannot
resolve a colour for a state it does not know it is in. The press is the shared
`PressableFeedback` treatment — which is how every close in the library already reads.
