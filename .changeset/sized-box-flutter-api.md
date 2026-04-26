---
"@xaui/native": patch
---

Refactor SizedBox to Flutter-inspired API: replace the `fullWidth` prop with `expand` (Flutter `Expanded` equivalent) and add `shrink` (`SizedBox.shrink()` equivalent). Move `Container` and `SizedBox` into `components/view/` subfolder. Add `ConstrainedBox` and `FractionallySizedBox` components.
