---
'@xaui/native': patch
---

`List` — rows on a ground.

`List.Item` and `List.ItemButton` with `ItemPrefix`, `ItemContent`, `ItemTitle`,
`ItemDescription` and `ItemSuffix`, on the anatomy `heroui-native`'s `ListGroup` uses.

**It is the `Accordion` with rows that do not open**, and it reads the same ladder, insets
its separators the same way and lifts the same one variant. Two containers that look alike
but are declared apart drift until a list on a card sits one shade off it; they will
eventually share the container that `Card`, `Popover`, `Accordion` and `Dialog` are all
waiting on, and until then they at least name the same tokens.

**The separators are the root's**, drawn between the children rather than by them — a row
that drew its own would draw one under the last one too, and every list would start by
hiding it. The fill is the root's for the same reason: a row painting its own would stack
two where the hairline sits, and the hairline would vanish into the seam. The inset stops
where the text starts, and `ghost`, having no edge to be inset from, runs its rows and its
hairlines the full width.

**It does not select.** No `selectionMode`, no `selectedKeys`: picking one of several things
is what `Select` and `Menu` are, and a list that owned a selection would be a second,
quieter menu with none of the affordances. A row that toggles carries the control that
toggles it — a `Switch` in its suffix — which says out loud what it does and is reachable as
the control it actually is.

**`ItemSuffix` draws nothing of its own.** HeroUI's puts a chevron there by default; the
trailing end of a settings row is a switch at least as often, and a slot that guesses makes
you pass a child in order to render nothing.

**A plain row does nothing, and shows nothing.** A list is not necessarily a list of
buttons; most are a table of facts, and a row that lights up under a finger it never
responds to is a promise the component does not keep. So `List.Item` is a `View` — no press
state, no wash, no role — and a row you can press is `List.ItemButton`, used in its place.
Structural rather than inferred: a single item that turned pressable when handed an
`onPress` would still be guessing, and the guess would be invisible in the JSX.
