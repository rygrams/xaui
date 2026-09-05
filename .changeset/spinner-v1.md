---
'@xaui/native': patch
---

feat(spinner): the v1 `Spinner` — seven inks, two rings, no SVG

The fifteenth entry of the core, and the one `Button.Spinner` was named after. **Two rings
and no slots**: the root is the track — the full circle, in the variant's ink at a fraction
of its opacity — and its one child is the arc that turns over it, the same circle with a
quarter missing. The two are one figure rather than two parts.

**A variant here names an ink**, which is the narrowing of §1 bis this component argues for.
On a `Chip`, `fg` means "the colour that reads *on* this variant's surface", so `primary`
resolves to `accentForeground` — white. A spinner has no surface, so `primary` is `accent`,
`secondary` is the accent as it reads on the page, `default` is `foreground`, `tertiary` is
`muted`, and the three status families are there for the wait whose outcome is already
named: deleting is a `danger` wait. **No `ghost`**, because a spinner with no ink is not a
spinner, and **no `-soft` slices**, because a soft slice is a fill softened.

HeroUI fades a single arc from opaque to 55%, which needs an SVG `linearGradient` and
therefore `react-native-svg` — an **optional peer**, which a component in the
fifteen-component core cannot require. Two circles of one ink at two opacities read as the
same figure, cost two views, and pull in nothing. The track is what does the work: a
rotating three-quarter ring on its own reads as broken rather than as busy.

`size` is the diameter and the only measurement a circle has — 16, 20, 24, 32, HeroUI's
three steps plus the one our ladder adds between the first two. The stroke thickens once,
at `lg`.

The turn moves to `hooks/use-rotation.ts` on its second use, per §2 bis, and
`Button.Spinner` stops carrying its own copy — with one duration for the library, because
two spinners on one screen at two speeds is a bug and one number is the only way to be sure
of it. That slot stays its own component rather than becoming `<Spinner size={…} color={…}
/>`: everything it draws was already resolved by the button's recipe, and handing those two
numbers to vocabulary props would be R6 in reverse.

The demo's screen list becomes data in the same change — a dozen adjacent hand-written
buttons in one JSX block is what made it conflict on every component branch.
