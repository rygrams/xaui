---
'@xaui/native': patch
---

feat(toggle-button): add exclusive ToggleButton.Group selection

`ToggleButton.Group` owns one selected value, with controlled and uncontrolled APIs. Its
members opt in through `value`, inherit the group appearance defaults, and remain usable at
any nesting depth through context.
