---
'@xaui/native': patch
---

feat(toggle-button): add an independent two-state action

`ToggleButton` follows the button's fixed-height scale and dot-notation composition while
owning or receiving a boolean selection. It exposes controlled and uncontrolled APIs,
publishes selected, pressed and disabled state to render children and custom slots, and
announces selection through `accessibilityState`.

Three variants provide filled, softly filled and content-only treatments. `primary` moves
from the neutral fill to the accent, `secondary` uses soft fills in both states, and
`ghost` stays transparent while its content changes to the accent. A raw `color` follows
through the uncached tint pass. `ToggleButton.Label` and `ToggleButton.Icon` inherit the
resolved selection colour, and icon-only controls keep the same missing-label warning as
`Button`.
