---
"@xaui/native": patch
---

fix(alert): correct solid variant color prominence in dark mode

In dark mode, solid variant now uses `colorScheme.background` as container fill and `colorScheme.main` as text/icon color, making it more vivid and pronounced than the flat variant as intended.
