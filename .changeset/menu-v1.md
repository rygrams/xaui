---
'@xaui/native': patch
---

`Menu` — Trigger · Overlay · Content · Label · Group · Item · ItemTitle · ItemDescription ·
ItemIndicator

A list of actions anchored to whatever opened it, and the **third** component to read the
anchored positioning extracted for the `Popover` — `utils/placement.ts`,
`hooks/use-anchor-ref.ts`, `hooks/use-anchored-position.ts`, `system/anchored/`. Nothing
about the measuring pass, the host origin or the collision flip is written again here,
which is the whole return on that extraction.

**The intent belongs to the row, not to the menu.** A menu is the theme's floating surface
like a popover, with no emphasis of its own — but one row in it can be the destructive one,
and a list where "Supprimer" reads like "Renommer" is the list that gets misread. `danger`
paints the title and any icon in it and nothing else: a red row would read as an alert.
The description stays muted whatever the intent, because a danger row says what it does in
red once and a red sentence under it says it twice.

Both faces of a row are resolved once on the root, so a menu of forty actions costs what a
menu of two costs and no slot ever touches the recipe (R5).

**Choosing a row closes the menu after the caller's `onPress` has run**, in that order: a
handler that reads the menu's state has to run while there is still a menu.
`closesOnPress={false}` is for the row that toggles something the reader will want to
toggle again.

`offset` defaults to 6 where the `Popover`'s is 9 — a menu belongs to the control it drops
out of, and a popover belongs to nothing.

`SubMenu` is not here. HeroUI ships it as its own component and it needs a second anchored
panel whose trigger is a row of the first, which is worth its own change.
