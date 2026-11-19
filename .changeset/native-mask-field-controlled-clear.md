---
'@xaui/native': patch
---

`MaskField`: a controlled field the app fills can be cleared again. What the field last reported is now kept in step with the value it shows, so emptying a pre-filled date no longer reads as "no change" and snaps back.
