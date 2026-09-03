---
'@xaui/native': patch
---

Fix `asChild` on `PressableFeedback`, which silently dropped every pressable prop.

Under `asChild` the root renders a `Slot`, and a `Slot` merges its props into its single
child. That child was the feedback context provider, so the ref, the style, the press
handlers and `disabled` all landed on a provider that ignores them: the caller's element
stopped reacting to touch entirely, with no error to say so. The provider now sits above
the root, and the caller's element receives the props it was always meant to.

The default overlay is no longer rendered under `asChild`. The caller's element _is_ the
pressable there, so there is no sibling to inject it as; the context is still published, so
`<PressableFeedback.Highlight />` among the caller's own children still works.
