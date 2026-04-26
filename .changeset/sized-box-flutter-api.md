---
"@xaui/native": patch
---

Refactor SizedBox to Flutter-inspired API: replace `fullWidth`/`style` props with `expand` (Flutter `Expanded` equivalent) and `shrink` (`SizedBox.shrink()` equivalent). Move `Container` and `SizedBox` into `components/view/` subfolder. Add `ConstrainedBox` and `FractionallySizedBox` components.
