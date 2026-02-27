---
'@xaui/core': minor
'@xaui/native': minor
---

refactor: update ColorScheme to semantic color tokens

Replace `background` and `foreground` properties on `ColorScheme` with
semantically named tokens aligned with Material Design 3:

- `background` → `container` (lighter surface for component backgrounds)
- `foreground` → `onMain` (content color on top of `main`)
- new: `onContainer` (content color on top of `container`)

All native components have been updated to use the new token names
across all variants (solid, flat, faded, bordered, light).
Documentation and theme examples updated accordingly.
