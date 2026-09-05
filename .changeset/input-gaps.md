---
'@xaui/native': patch
---

The `Input`'s column tightens by a point at every size

`gap` was 4, 4, 6, 8 and is now 3, 3, 5, 7. A label, a field and a line of help are one
thing the eye reads top to bottom, not three stacked blocks, and the whole spacing step let
them drift far enough apart to read as a list.

Quarter steps rather than a new scale: `spacing` takes a fraction, and the `Chip` already
measures its dot and its cross that way. It stays a `gap` on the root and not a margin on
any slot (R4) — which is what keeps the space above and below the field identical, and what
stops an omitted `Input.Description` from leaving a hole behind it.

`TextArea` inherits it, having no recipe of its own.
