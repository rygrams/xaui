---
'@xaui/native': patch
---

Add `Portal` and `PortalHost` to `@xaui/native/system`.

`Portal` renders its children into the nearest `PortalHost` instead of where it sits, which
is what `Dialog`, `Sheet`, `Drawer` and `Snackbar` will be built on — an overlay has to
escape the clipping and stacking of whatever container held the trigger. Publishing happens
in a layout effect, so the content lands in the same commit as the trigger's and an overlay
never shows a frame late.

Outside a host the context is `null` and `Portal` renders nothing rather than throwing: an
app that forgot `PortalHost` should lose its overlays, not crash on its first dialog.
