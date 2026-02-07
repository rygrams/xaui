---
"@xaui/native": patch
---

Full FAB implementation update across all FAB-related components.

- rework core `Fab` implementation and styling behavior
- update `Fab` API to use semantic `radius` values (`'none' | 'sm' | 'md' | 'lg' | 'full'`)
- rework `FabMenu` implementation, state handling, and toggle behavior
- improve `FabMenu` backdrop rendering and open/close animations
- update `FabMenu` API to use semantic `radius` values (`'none' | 'sm' | 'md' | 'lg' | 'full'`)
- improve `FabMenuItem` rendering and icon color visibility
- align FAB demo usage and FAB-related type tests with the new implementation
