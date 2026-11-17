---
'@xaui/native': patch
---

`@xaui/native/system` now exports `containsElementOfType`, `warnDev` and
`useAnimationDisabled` — what a component root needs to auto-insert a slot, to warn in
development, and to honour an ancestor's `animation="disable-all"`.
