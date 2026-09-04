---
'@xaui/native': patch
---

feat(switch): the v1 `Switch` — two shapes, one flip

The tenth entry of the core, and the third of the toggles. The root is the row, so tapping
the label flips the switch; R3 wraps a text child into the label and supplies the track and
the knob.

**`variant` is a geometry axis here**, which no other component does: `primary` rides the
knob inside the track, `secondary` stands it over a thinner bar. They are the legacy
component's `inside` and `overlap` — the same two shapes and the same measurements — under
the library's own two names, so the v1 API keeps one vocabulary instead of a third pair of
words for this component alone. Both are the accent when they are on, which is why the
whole table lives in eight compounds and the colours in one `paint`.

**No `isInvalid`.** A switch applies its change the moment it is flipped, so there is no
later moment at which it can be wrong — a checkbox states an intention a form submits, and
that is the one that can be. A setting that cannot be turned on is `isDisabled`.

The track's colour is crossed rather than swapped and the knob slides on the same 175ms,
from one constant neither slot owns, so a flip reads as one movement. Both are values on the
context rather than styles — a worklet needs a number and a string, not a style to flatten
every frame — and the travel is `width − knob − 2 × inset`, arithmetic the root does.

`color` is the colour the switch turns on to; the track at rest keeps its neutral, because
a switch that is off is off in every brand.

The knob moves with `translateX` and the sign is flipped against `I18nManager.isRTL`: R13
bans a directional inset, and a transform does not mirror on its own.
