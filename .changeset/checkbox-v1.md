---
'@xaui/native': patch
---

feat(checkbox): the v1 `Checkbox` — a box, a mark and the label that toggles it

The eighth entry of the core. **The root is the row, not the box**: it is the pressable, so
tapping the label ticks the checkbox — which is the whole reason `Checkbox.Label` is a slot
here rather than a `Text` you put beside the component and wire up yourself. HeroUI needs a
second component (`ControlField`) for that; the plan's slots for this one are Indicator ·
Label, and this is why.

R3 goes one step further than elsewhere: a stringifiable tree becomes the label **and the
root supplies the indicator**, because a checkbox without a box is not a checkbox. Written
with no children at all it is the box alone — the form a table row wants.

**Selection is not a style axis.** The fill and the mark are two slots the indicator mounts
only while it is ticked, painted from two new roles — `bgSelected` and `fgSelected`. That
keeps the cache at one entry per token combination instead of two, and it is what makes
`color` **the colour the box checks in**: the tint pass re-runs `paint` and the states,
never the axes, so a fill written as an axis would have snapped back to the accent the
moment the box was ticked. `Radio` and `Switch` need the same pair, which is why the roles
are in the engine rather than in this recipe.

Three of the `Input`'s four levels, on the same `field*` tokens — `ghost` is absent, because
a box with no border and no fill is nothing at all — plus the four sizes, `radius`,
`isInvalid` (which drops the resting fill and outranks the tint) and `isDisabled`.

`isIndeterminate` is ours and not HeroUI's: the legacy checkbox had it, a "select all" is
what it is for, and `accessibilityState.checked: 'mixed'` is something only the component
can say. A press resolves it to selected rather than toggling into it.

The check is **drawn**, not imported — two borders of an empty box, a quarter turn from
where they look like a tick — so a checkbox works in a project that has installed no icon
set. It is the `CloseButton`'s bargain. Children of `Checkbox.Indicator` replace it and ride
the same 120ms fade.
