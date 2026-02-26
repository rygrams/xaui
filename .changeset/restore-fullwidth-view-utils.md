---
'@xaui/native': patch
---

Restore `fullWidth` on `Column`, `Padding`, `Margin`, and `Center` with a simplified behavior that applies only `width: '100%'`. Keep default `flex: 1` layout behavior and update docs/types to match.
