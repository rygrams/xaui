---
'@xaui/native': patch
---

Simplify native view layout primitives by removing `fullWidth` from `Column`, `Padding`, `Margin`, and `Center`, and make these components default to `flex: 1` for consistent space usage in vertical layouts.
