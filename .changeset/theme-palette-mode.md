---
'@xaui/core': patch
'@xaui/native': patch
---

Add theme palette and mode support with new hooks

- Add `palette` field to XUITheme interface for accessing full color token system
- Add `mode` field to XUITheme to track current theme mode (light/dark)
- Add `useXUIPalette` hook for accessing theme palette with memoization
- Update theme provider to dynamically set mode based on color scheme
