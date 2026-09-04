---
'@xaui/native': patch
'@xaui/native-legacy': patch
---

feat(chip): the v1 `Chip` — P3.5

A compact token — a status, a tag, a filter, a person. Compound root plus five slots:
`Chip.Label`, `Chip.Icon`, `Chip.Dot`, `Chip.Avatar` and `Chip.Close`, spaced by the root
alone, so JSX order is screen order and there is no `startContent` / `endContent`.

Eleven flat variants replace HeroUI's `variant × color` matrix: the `Button`'s five-step
emphasis ladder plus the three status families it deliberately refused — a chip reports an
outcome, so `success`, `warning` and `danger` each land here with their soft slice.

Visually aligned with `heroui-native`: 12pt of horizontal padding, a 14/20 label and a 28pt
`md`, with the height fixed rather than derived from vertical padding so a chip carrying an
avatar still lines up with the one beside it.

`Chip.Close` is a control in its own right — its own press state, its own `hitSlop`, and a
cross it draws itself, so a dismissible chip needs no icon set installed.

Also extracts the `radius` axis, duplicated in every recipe that has one, into
`radiusAxis()` in `system/recipe/`.

`Chip.Avatar` is pulled back into the capsule's rounded end. The root's horizontal padding
is set for text — 12pt at `md` — while the height leaves only 3pt above and below a 22pt
avatar, so a face sat visibly pushed into the chip where a label beside it looked right. The
slot now cancels the difference, which seats it concentrically with the rounded end: the
capsule's cap is a circle of radius `height / 2` and the avatar is one of radius
`diameter / 2`, so they share a centre only when the gap is equal on every side. It is the
one margin on a slot in this component, and R4 is about spacing _between_ slots rather than
about cancelling the parent's padding — `Chip.Avatar` is a leading slot by contract, which
is what makes a leading-only correction sound. `marginStart`, so RTL follows (R13), and
clamped at zero so a theme with tighter padding needs no pull at all.
