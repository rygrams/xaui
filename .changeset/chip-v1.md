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
